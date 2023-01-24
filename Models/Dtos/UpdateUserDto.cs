namespace Catalog_Online.Models.Dtos
{
    public class UpdateUserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int YearOfStudying { get; set; }
        public string RegistrationNumber { get; set; }
        public string Class { get; set; }
    }
}
