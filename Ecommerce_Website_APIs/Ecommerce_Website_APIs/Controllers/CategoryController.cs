using Ecommerce_Website_APIs.DTOs;
using Ecommerce_Website_APIs.Entities;
using Ecommerce_Website_APIs.Repositories.Base;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Ecommerce_Website_APIs.Helpers.Responses;
namespace Ecommerce_Website_APIs.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    //[ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        //get all
        [AllowAnonymous]
        [HttpGet("Categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _unitOfWork.Categories.GetAll();
            return Ok(new
            {
                status = 200,
                categories
            });
        }

        //get random categories
        [AllowAnonymous]
        [HttpGet("GetRandomCategories")]
        public async Task<IActionResult> GetRandomCategories()
        {
            var categories = await _unitOfWork.Categories.GetAll();
            var allCategories = categories.ToList();
            HashSet<Category> randomCategories = new();
            Random rnd = new();

            while(randomCategories.Count < 3)
            {
                int index = rnd.Next(0, categories.Count());
                Category category = allCategories[index];
                randomCategories.Add(category);
            }

            return Ok(new
            {
                status = StatusCodes.Status200OK,
                randomCategories
            });
        }

        //get all categories [pagination]
        [HttpGet("Categories/{pageNumber:int}")]
        public async Task<IActionResult> GetAllCategories([FromRoute] int pageNumber = 1)
        {
            //check page number
            if (pageNumber <= 0) pageNumber = 1;
            //get all categories
            var categories = await _unitOfWork.Categories.GetAll(pageNumber, c => c.UpdatedDate);
           return  Ok(new { status = 200, categories });
        }

        //get category
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            //find category
            var category = await _unitOfWork.Categories.FindOne(c => c.Id.Equals(id));
            //check category (exist or not)
            if (category is null)
                return NotFound(BadRequestResponse(new[] { $"Not exist any Category by this Id <{id}>" }));
            return Ok(new
            {
                status = 200,
                category
            });
        }

        //create category
        [HttpPost("Create")]
        public async Task<IActionResult> CreateCategory([FromBody]CategoryDTO categoryDTO)
        {
            //handle errors
            if(!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage).ToArray();
                return BadRequest(BadRequestResponse(errors));
            }

            //check category name exist or not
            if(await _unitOfWork.Categories.FindOne(c => c.Name!.ToLower().Trim() == categoryDTO.Name!.ToLower().Trim()) is not null)
            {
                return BadRequest(BadRequestResponse(new[] { $"The Category <<{categoryDTO.Name}>> is already Exist." }));
            }

            //add category
            Category category = new()
            {
                Name = categoryDTO.Name!.ToLower().Trim()
            };
            await _unitOfWork.Categories.AddOne(category);
            return Ok(OkResponse($"Category <{categoryDTO.Name}> has been Created successfully"));
        }

        //update Category
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCategory([FromRoute]int id, [FromBody]CategoryDTO categoryDTO)
        {
            //handle errors
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage).ToArray();
                return BadRequest(BadRequestResponse(errors));
            }

            //find category
            var category = await _unitOfWork.Categories.FindOne(c => c.Id.Equals(id));
            //check category by id
            if (category is null)
                return BadRequest(BadRequestResponse(new[] { $"Not exist any Category by this ID <<{id}>>" }));

            //check name (duplicate)
            var isCategoryNameExist = await _unitOfWork.Categories.FindOne(c => c.Name!.ToLower().Trim() == categoryDTO.Name!.ToLower().Trim());

            if (isCategoryNameExist is not null)
                return BadRequest(BadRequestResponse(new[] { $"The category <{categoryDTO.Name}> is already Exist" }));
            //update category
            category.Name = categoryDTO.Name!.ToLower();
            category.UpdatedDate = DateTime.UtcNow;
            await _unitOfWork.Categories.CommitChanges();

            return Ok(OkResponse("The category has been updated successfully"));
        }

        //delete category
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            //handle errors
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage).ToArray();
                return BadRequest(BadRequestResponse(errors));
            }

            //find category
            var category = await _unitOfWork.Categories.FindOne(c => c.Id.Equals(id));
            //check category by id
            if (category is null)
                return BadRequest(BadRequestResponse(new[] { $"Not exist any Category by this ID <<{id}>>" }));

            await _unitOfWork.Categories.DeleteOne(category);
            return Ok(OkResponse($"The category <{category.Name}> has been deleted successfully"));
        }
    }
}
