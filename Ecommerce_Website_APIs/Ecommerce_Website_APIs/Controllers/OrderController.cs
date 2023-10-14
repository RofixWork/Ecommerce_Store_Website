using Ecommerce_Website_APIs.Entities;
using Ecommerce_Website_APIs.Repositories.Base;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using static Ecommerce_Website_APIs.Helpers.Responses;
namespace Ecommerce_Website_APIs.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public OrderController(IUnitOfWork unitOfWork, UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpGet("Orders/{pageNumber:int}")]
        public async Task<IActionResult> GetOrders(int pageNumber = 1)
        {
            if (pageNumber <= 0) pageNumber = 1;
            var orders = await _unitOfWork.Orders.GetAll(pageNumber, o => o.UpdatedData, "Product");
            return Ok(new
            {
                status = StatusCodes.Status200OK,
                orders
            });
        }
        //get user orders
        [HttpGet("user-orders/{pageNumber:int}")]
        public async Task<IActionResult> GetUserOrders([FromRoute]int pageNumber, [FromQuery]string userId)
        {
            if (pageNumber <= 0) pageNumber = 1;

            //check User
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
                return NotFound(NotFoundResponse(new[] { $"Not exist any user by this Id <{userId}>" }));

            var userOrders = await _unitOfWork.Orders.Filter(pageNumber, order => order.UserId!.Equals(userId), o => o.UpdatedData, "Product");

            return Ok(new
            {
                status = StatusCodes.Status200OK,
                orders = userOrders
            });
        }

        //get user order details
        [HttpGet("user-order-details/{orderId:int}")]
        public async Task<IActionResult> GetUserOrderDetails([FromRoute] int orderId, [FromQuery] string userId)
        {
            //check User
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
                return NotFound(NotFoundResponse(new[] { $"Not exist any user by this Id <{userId}>" }));

            var order = await _unitOfWork.Orders.FindOne(p => p.Id == orderId && p.UserId == userId, "Product");

            if (order is null)
                return NotFound(NotFoundResponse(new[] { "This Order not found" }));

            return Ok(new
            {
                status = StatusCodes.Status200OK,
                order
            });
        }

        //update user order details
        [HttpPatch("user-update-order/{orderId:int}")]
        public async Task<IActionResult> UserUpdateOrder([FromRoute] int orderId, [FromQuery] string userId, [FromBody] JsonPatchDocument<Order> jsonPatchDocument)
        {
            //check User
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
                return NotFound(NotFoundResponse(new[] { $"Not exist any user by this Id <{userId}>" }));

            var order = await _unitOfWork.Orders.FindOne(p => p.Id == orderId && p.UserId == userId, "Product");

            if (order is null)
                return NotFound(NotFoundResponse(new[] { "This Order not found" }));

            jsonPatchDocument.ApplyTo(order);
            await _unitOfWork.Orders.CommitChanges();

            return Ok(OkResponse("Order Received..."));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            //find order
            var order = await _unitOfWork.Orders.FindOne(p => p.Id.Equals(id), "Product", "User");
            //check product
            if (order is null)
                return BadRequest(BadRequestResponse(new[] { $"Not Exist any product by this Id <{id}>" }));

            return Ok(new
            {
                status = StatusCodes.Status200OK,
                order
            });
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> OrderlUpdatePartial(int id, [FromBody]JsonPatchDocument<Order> jsonPatchDocument)
        {
            //find order
            var order = await _unitOfWork.Orders.FindOne(p => p.Id.Equals(id));
            //check product
            if (order is null)
                return BadRequest(BadRequestResponse(new[] { $"Not Exist any order by this Id <{id}>" }));

            jsonPatchDocument.ApplyTo(order, ModelState);
            await _unitOfWork.Orders.CommitChanges();
            
            return Ok(OkResponse("Product has been sent to customer and i't on the way right now"));

        }
    }
}
