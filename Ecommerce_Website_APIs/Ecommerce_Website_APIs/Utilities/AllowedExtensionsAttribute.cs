using System.ComponentModel.DataAnnotations;

namespace Ecommerce_Website_APIs.Utilities
{
    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] _allowedExtesnions;
        private readonly string _title;

        public AllowedExtensionsAttribute(string title,string[] allowedExtesnions)
        {
            _allowedExtesnions = allowedExtesnions;
            _title = title;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var formFile = value as IFormFile;

            if(formFile is not null)
            {
                if (!_allowedExtesnions.Any(p => p.Equals(formFile.ContentType)))
                {
                    return new ValidationResult($"The Extension {_title} <{formFile.ContentType}> is not Allowed");
                }
            }
            return ValidationResult.Success;
        }
    }
}
