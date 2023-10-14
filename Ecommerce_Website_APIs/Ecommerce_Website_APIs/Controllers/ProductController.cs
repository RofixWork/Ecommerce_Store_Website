using Ecommerce_Website_APIs.DTOs;
using Ecommerce_Website_APIs.Entities;
using Ecommerce_Website_APIs.Repositories.Base;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using static Ecommerce_Website_APIs.Helpers.Responses;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Ecommerce_Website_APIs.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    //[ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        //get all products
        [HttpGet("Products")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProducts([FromQuery]int? pageNumber)
        {
            if (pageNumber <= 0) pageNumber = 1;

            var products = pageNumber is not null ? await _unitOfWork.Products.GetAll(Convert.ToInt32(pageNumber), p => p.UpdatedDate) : await _unitOfWork.Products.GetAll();
            return Ok(new
            {
                status = StatusCodes.Status200OK,
                products
            });
        }

        //get One product
        [HttpGet("{id:int}", Name = "GetSingleProduct")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProduct(int id)
        {
            //find product
            var product = await _unitOfWork.Products.FindOne(p => p.Id.Equals(id), "Category");
            //check product
            if (product is null)
                return BadRequest(BadRequestResponse(new[] { $"Not Exist any product by this Id <{id}>" }));

            return Ok(new
            {
                status = StatusCodes.Status200OK,
                product
            });
        }

        //get category products
        [HttpGet("GetCategoryProducts/{categoryName}/{pageNumber}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCategoryProducts(string categoryName, int pageNumber = 1)
        {
            if (pageNumber <= 0) pageNumber = 1;
            //find category by name
            var category = await _unitOfWork.Categories.FindOne(c => c.Name!.Equals(categoryName.ToLower().Trim()));
            //check category
            if (category is null)
                return BadRequest(BadRequestResponse(new[] { $"Not exist any category by this Name <{categoryName}>" }));

            //find categoryproducts
            var categoryProducts = await _unitOfWork.Products.Filter(pageNumber, p => p.CategoryId.Equals(category.Id), p => p.UpdatedDate);
            return Ok(new { status = 200, categoryProducts });
        }

        //saerch products
        [HttpGet("SearchProducts/{keyword}/{pageNumber:int}"), AllowAnonymous]
        public async Task<IActionResult> SaerchProducts([FromRoute] string keyword, [FromRoute] int pageNumber = 1)
        {
            if (pageNumber <= 0) pageNumber = 1;
            var products = await _unitOfWork.Products.Filter(pageNumber, p => p.Title!.ToLower().Contains(keyword.ToLower().Trim()), p => p.UpdatedDate);

            return Ok(new
            {
                status = StatusCodes.Status200OK,
                matchedProducts = products
            });
        }

        //create product
        [HttpPost("Create")]
        public async Task<IActionResult> CreateProduct([FromForm] ProdcutDTO prodcutDTO)
        {
            //handle errors
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage).ToArray();
                return BadRequest(BadRequestResponse(errors));
            }
            //check category id
            if (await _unitOfWork.Categories.FindOne(p => p.Id.Equals(prodcutDTO.CategoryId)) is null)
                return BadRequest(BadRequestResponse(new[] { "Choose Product Category!" }));
            //upload images
            var img1 = await UploadImage(prodcutDTO.Image1!);
            var img2 = await UploadImage(prodcutDTO.Image2!);
            var img3 = await UploadImage(prodcutDTO.Image3!);

            //init images
            Product product = new()
            {
                Title = prodcutDTO.Title,
                Price = prodcutDTO.Price,
                Discount = prodcutDTO.Discount,
                Stock = prodcutDTO.Stock,
                CategoryId = prodcutDTO.CategoryId,
                Colors = prodcutDTO.Colors,
                Sizes = prodcutDTO.Sizes,
                Description = prodcutDTO.Description,
                Image1 = img1,
                Image2 = img2,
                Image3 = img3,
            };

            //create
            await _unitOfWork.Products.AddOne(product);

            return CreatedAtRoute("GetSingleProduct", new { id = product.Id }, OkResponse("The Product has been created Successfully"));
        }

        //edit product
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] UpdateProductDTO updateProductDTO)
        {
            //handle errors
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage).ToArray();
                return BadRequest(BadRequestResponse(errors));
            }

            //find product by id
            var product = await _unitOfWork.Products.FindOne(p => p.Id.Equals(id));

            if (product == null)
            {
                return BadRequest(BadRequestResponse(new[] { $"Not Exist any product by this Id <{id}>" }));
            }

            //edit
            product.Title = updateProductDTO.Title;
            product.Price = updateProductDTO.Price;
            product.Discount = updateProductDTO.Discount;
            product.Stock = updateProductDTO.Stock;
            product.Colors = updateProductDTO.Colors;
            product.CategoryId = updateProductDTO.CategoryId;
            product.Sizes = updateProductDTO.Sizes;
            product.Description = updateProductDTO.Description;
            product.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.Products.CommitChanges();

            return Ok(OkResponse("The Product has been Updated Successfully"));
        }

        //delete product
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            //find product by id
            var product = await _unitOfWork.Products.FindOne(p => p.Id.Equals(id));

            if (product == null)
            {
                return BadRequest(BadRequestResponse(new[] { $"Not Exist any product by this Id <{id}>" }));
            }

            //delete product
            await _unitOfWork.Products.DeleteOne(product);
            return Ok(OkResponse("The Product has been Removed Successfully"));
        }

        //upload image function
        private async Task<string> UploadImage(IFormFile formFile)
        {
            using MemoryStream memoryStream = new();
            await formFile.CopyToAsync(memoryStream);

            var image = Convert.ToBase64String(memoryStream.ToArray());

            return $"data:image/jpg;base64,{image}";
        }
    }
}
