using Catalog_Online.Helper;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class TeacherServiceImpl : ITeacherService
    {
        RepositoryContext _context;

        public TeacherServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        Teacher ITeacherService.AddTeacherData(Teacher teacher)
        {
           var newTeacher = _context.Teachers.Add(teacher);
            _context.SaveChanges();
            return newTeacher.Entity;
        }

        Teacher ITeacherService.GetByUserId(int id)
        {
            return _context.Teachers.FirstOrDefault(t => t.UserId == id);
        }
    }
}
