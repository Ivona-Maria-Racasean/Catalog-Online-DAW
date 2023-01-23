namespace Catalog_Online.Models.Dto
{
    public class RegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public int RoleId { get; set; }
        public string RegistrationNumber { get; set; }
        public string Class { get; set; }
        public int YearOfStudy { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
}
