namespace Catalog_Online.Models
{
    public class Subject
    {
        public int Id { get; set; } 
        public int TeacherId { get; set; }  
        public string Name { get; set; } 
        public string Semester { get; set; }    
        public int YearOfTeaching { get; set; } 

    }
}
