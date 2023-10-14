using Ecommerce_Website_APIs.DTOs;
using Ecommerce_Website_APIs.Entities;
using Ecommerce_Website_APIs.Helpers;
using Ecommerce_Website_APIs.Repositories.Base;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;
using static Ecommerce_Website_APIs.Helpers.Responses;
namespace Ecommerce_Website_APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        public PaymentsController(IConfiguration configuration, UserManager<User> userManager, IUnitOfWork unitOfWork)
        {
            _configuration = configuration;
            StripeConfiguration.ApiKey = _configuration.GetSection("Stripe:SecretKey").Value!;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] PaymentDTO paymentDTO)
        {
            //check user by email
            var user = await _userManager.FindByEmailAsync(paymentDTO.Email!);
            if (user is null)
            {
                return NotFound(NotFoundResponse(new[] { $"Not exist any user by this Email <{paymentDTO.Email}>" }));
            }
            var orders = paymentDTO.Cart!.Select(product => new OrderData
            {
                Id = product.Id,
                Quantity = product.Quantity,
                Size = product.Size,
                Color = product.Color,
                UserId = user.Id
            }).ToList();
            var customerOptions = new CustomerCreateOptions()
            {
                Email = user.Email,
                Metadata = new Dictionary<string, string>
                {
                    {"cart", JsonConvert.SerializeObject(orders)}
                }
            };
            var services = new CustomerService();
            var customer = await services.CreateAsync(customerOptions);
            var options = new SessionCreateOptions
            {
                BillingAddressCollection = "auto",
                ShippingAddressCollection = new SessionShippingAddressCollectionOptions()
                {
                    AllowedCountries = new List<string>() { "MA", "DZ", "TN" }
                },
                ShippingOptions = new List<SessionShippingOptionOptions>()
                {
                    new SessionShippingOptionOptions()
                    {
                        ShippingRateData = new SessionShippingOptionShippingRateDataOptions
                        {
                            Type = "fixed_amount",
                            FixedAmount = new SessionShippingOptionShippingRateDataFixedAmountOptions
                            {
                            Amount = 0,
                            Currency = "usd",
                            },
                            DisplayName = "Free shipping",
                            DeliveryEstimate = new SessionShippingOptionShippingRateDataDeliveryEstimateOptions
                            {
                                Minimum = new SessionShippingOptionShippingRateDataDeliveryEstimateMinimumOptions
                            {
                                Unit = "business_day",
                                Value = 5,
                            },
                            Maximum = new SessionShippingOptionShippingRateDataDeliveryEstimateMaximumOptions
                            {
                                Unit = "business_day",
                                Value = 7,
                            },
                            },
                        }
                    }
                },
                LineItems = LineItems.Push(paymentDTO.Cart!),
                Customer = customer.Id,
                Mode = "payment",
                SuccessUrl = $"{_configuration.GetSection("Stripe:Client").Value!}/user-orders?session_id=" + "{CHECKOUT_SESSION_ID}",
                CancelUrl = $"{_configuration.GetSection("Stripe:Client").Value!}/cart",
            };
            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return Ok(new
            {
                status = 200,
                url = session.Url
            });
        }

        //webhook (send notifications)
        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], _configuration.GetSection("Stripe:EndpointSecret").Value!);

                // Handle the event
                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                }
                else if(stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var data = stripeEvent.Data.Object as Session;
                    var customerId = data.CustomerId;
                    
                    var services = new CustomerService();
                    var customer = await services.GetAsync(customerId);
                    await Console.Out.WriteLineAsync(JsonConvert.SerializeObject(customer));
                    var cart = JsonConvert.DeserializeObject<List<OrderData>>(customer.Metadata["cart"]);
                    if(cart is not null)
                    {
                        foreach (var item in cart)
                        {
                            //find product
                            var product = await _unitOfWork.Products.FindOne(p => p.Id == item.Id);

                            if(product is not null)
                            {
                                Console.WriteLine($"not exist any product by this id <{item.Id}>");
                            }

                            //find user
                            var user = await _userManager.FindByIdAsync(item.UserId!);

                            if (user is null)
                            {
                                Console.WriteLine($"not exist any user by this id <{item.UserId}>");
                            }

                            var order = new Order
                            {
                                ProductId = item.Id,
                                Color = item.Color,
                                Size = item.Size,
                                UserId = item.UserId,
                                Quantity = item.Quantity
                            };
                            await _unitOfWork.Orders.AddOne(order);

                            if(product is not null)
                            {
                                int stock = product.Stock - item.Quantity;
                                if (stock <= 0)
                                {
                                    product.Stock = 0;
                                }
                                product.Stock = stock;
                                await _unitOfWork.Products.CommitChanges();
                            }
                        }
                    }
                    
                }
                // ... handle other event types
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }

        //verify payment
        [HttpGet("verify-payment/{id}")]
        public async Task<IActionResult> VerifyPayment(string id)
        {
            try
            {
                var service = new SessionService();
                var session = await service.GetAsync(id);
                return Ok(new
                {
                    status = session.PaymentStatus,
                    message = "your payment has verified successfully"
                });
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
