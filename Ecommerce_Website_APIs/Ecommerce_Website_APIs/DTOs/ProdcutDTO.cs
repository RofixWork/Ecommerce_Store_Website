using Ecommerce_Website_APIs.Entities;
using Ecommerce_Website_APIs.Utilities;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website_APIs.DTOs
{
    public class ProdcutDTO
    {
        [Required, MaxLength(length:255)]
        public string? Title { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Discount { get; set; }
        [Required]
        public int Stock { get; set; }
        public string? Colors { get; set; }
        public string? Sizes { get; set; }
        [Required, AllowedExtensions("Image One",new[] {"image/jpeg", "image/png"})]
        public IFormFile? Image1 { get; set; }
        [Required, AllowedExtensions("Image Two", new[] { "image/jpeg", "image/png" })]
        public IFormFile? Image2 { get; set; }
        [Required, AllowedExtensions("Image Three", new[] { "image/jpeg", "image/png" })]
        public IFormFile? Image3 { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}
