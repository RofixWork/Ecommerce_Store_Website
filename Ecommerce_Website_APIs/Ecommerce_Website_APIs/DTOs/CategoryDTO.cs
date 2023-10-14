using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website_APIs.DTOs
{
    public class CategoryDTO
    {
        [Required]
        public string? Name { get; set; }
    }
}
