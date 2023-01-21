using Catalog_Online.Models.Entity;
using System.Collections.Generic;

namespace Catalog_Online.Models.Entities
{

    public class SubjectsStudents
    {
        public SubjectsStudents() { 
            EnrolledStudents = new List<User>();
            MissingStudents = new List<User>();
        }
        public List<User> EnrolledStudents { get; set; }
        public List<User> MissingStudents { get; set; } 
    }
}
