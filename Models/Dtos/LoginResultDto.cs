using System.Collections.Generic;

namespace Catalog_Online.Models.Dtos
{
    public class LoginResultDto
    {
        public bool IsAuthSuccessful { get; set; }
        public string JWToken { get; set; }
        public string ErrorMessage { get; set; }
    }
}
