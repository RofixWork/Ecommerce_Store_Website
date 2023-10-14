using Ecommerce_Website_APIs.Utilities;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website_APIs.DTOs
{
    public class UpdateProductDTO
    {
        [Required, MaxLength(length: 255)]
        public string? Title { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Discount { get; set; }
        [Required]
        public int Stock { get; set; }
        public string? Colors { get; set; }
        public string? Sizes { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}
