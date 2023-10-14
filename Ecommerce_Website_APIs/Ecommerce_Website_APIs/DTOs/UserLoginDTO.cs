using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website_APIs.DTOs
{
    public class UserLoginDTO
    {
        [Required, RegularExpression(@"^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$", ErrorMessage = "Invalid Email Address Format"), DefaultValue("user@mail.com")]
        public string? Email { get; set; }
        [Required, MinLength(6, ErrorMessage = "Use at least 6 characters in the Password"), DefaultValue("123456")]
        public string? Password { get; set; }
    }
}
