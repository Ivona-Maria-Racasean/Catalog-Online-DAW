namespace Catalog_Online.Models.Dtos
{
    public class UpdateUserDto
    {
        public int UserId { get; set; }
        public int RolId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
}
