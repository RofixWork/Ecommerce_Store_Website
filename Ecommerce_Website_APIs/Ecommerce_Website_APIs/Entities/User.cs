using Microsoft.AspNetCore.Identity;

namespace Ecommerce_Website_APIs.Entities
{
    public class User : IdentityUser
    {
        public string? Name { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();

    }
}
