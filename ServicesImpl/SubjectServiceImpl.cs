using Catalog_Online.Helper;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using System.Collections.Generic;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class SubjectServiceImpl : ISubjectService
    {
        RepositoryContext _context;

        public SubjectServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        public Subject AddSubject(Subject subject)
        {
            var newSubject = _context.Subjects.Add(subject);
            _context.SaveChanges();
            return newSubject.Entity;
        }

        public List<Subject> GetAllBySemesterAndYear(string Semester, string Year)
        {
            return _context.Subjects.Where(s => s.Semester == Semester && s.YearOfTeaching.Equals(Year)).ToList(); 
        }
    }
}
