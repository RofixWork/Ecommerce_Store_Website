using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Stripe.Checkout;

namespace Ecommerce_Website_APIs.DTOs
{
    public class LineItem
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public long UnitAmount { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
    }

    public class LineItems
    {
            public static List<SessionLineItemOptions> Push(List<LineItem> cartItems)
            {
                List<SessionLineItemOptions> sessionLineItemOptions = new();
                if (cartItems is not null && cartItems.Any())
                {
                    foreach (var item in cartItems)
                    {
                        sessionLineItemOptions.Add(new SessionLineItemOptions
                        {
                            PriceData = new SessionLineItemPriceDataOptions
                            {
                                UnitAmountDecimal = item.UnitAmount * 100,
                                Currency = "usd",
                                ProductData = new SessionLineItemPriceDataProductDataOptions
                                {
                                    Name = item.Name,
                                },
                            },
                            Quantity = item.Quantity,
                        });
                    }
  
            }
            return sessionLineItemOptions;
        }
    }
    public class PaymentDTO
    {
        [Required, RegularExpression(@"^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$", ErrorMessage = "Invalid Email Address Format"), DefaultValue("user@mail.com")]
        public string? Email { get; set; }
        [Required]
        public List<LineItem>? Cart { get; set; }
    }
}
