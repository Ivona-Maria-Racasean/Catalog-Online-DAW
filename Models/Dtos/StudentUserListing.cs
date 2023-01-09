using Catalog_Online.Models.Entity;

namespace Catalog_Online.Models.Dtos
{
    public class StudentUserListing
    {
        public int Id { get; set; }

        public int UserId { get; set; } 
        public int YearOfStudying { get; set; }
        public string RegistrationNumber { get; set; }
        public string Class { get; set; }
        public User User { get; set; }
    }
}
