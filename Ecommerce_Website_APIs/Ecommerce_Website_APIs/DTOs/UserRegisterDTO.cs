using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website_APIs.DTOs
{
    public class UserRegisterDTO
    {
        [Required, RegularExpression(@"^[A-Za-z][A-Za-z0-9_]{7,29}$", ErrorMessage = "Invalid Format Username"),  DefaultValue("samantha_123")]
        [MinLength(7, ErrorMessage = "Use at least 6 characters in the Username")]
        [MaxLength(29, ErrorMessage = "The length of 'Username' must {29} characters or fewer")]
        public string? Name { get; set; }
        [Required, RegularExpression(@"^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$", ErrorMessage = "Invalid Email Address Format"), DefaultValue("user@mail.com")]
        public string? Email { get; set; }
        [Required, MinLength(6, ErrorMessage = "Use at least 6 characters in the Password"), DefaultValue("123456")]
        public string? Password { get; set; }
    }
}
