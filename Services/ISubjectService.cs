using Catalog_Online.Models.Entity;
using System.Collections.Generic;
using System.Globalization;

namespace Catalog_Online.Services
{
    public interface ISubjectService
    {
        public Subject AddSubject(Subject subject);

        public List<Subject> GetAllBySemesterAndYear(string Semester, string Year);

    }
}
