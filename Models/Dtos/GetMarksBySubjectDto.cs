using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog_Online.Models.Dtos
{
    public class GetMarksBySubjectDto
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public float Value { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
