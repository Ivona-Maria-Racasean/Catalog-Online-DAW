using Catalog_Online.Helper;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class StudentDataServiceImpl : IStudentDataService
    {
        RepositoryContext _context;

        public StudentDataServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        public StudentData AddStudentData(StudentData studentData)
        {
            var newStudentData = _context.StudentsData.Add(studentData);   
            _context.SaveChanges();
            return newStudentData.Entity;
        }

        public StudentData GetByUserId(int id)
        {
            return _context.StudentsData.FirstOrDefault(sd => sd.UserId == id);
        }

        public StudentData UpdateStudentData(StudentData newStudentData, int id)
        {
            var originalStudentData = _context.StudentsData.FirstOrDefault(sd => sd.Id == id);
            if (originalStudentData == null) return null;

            originalStudentData.Id = newStudentData.Id;
            originalStudentData.RegistrationNumber = newStudentData.RegistrationNumber; 
            originalStudentData.YearOfStudying = newStudentData.YearOfStudying;
            originalStudentData.UserId = newStudentData.UserId; 
            originalStudentData.Class = newStudentData.Class;   

            _context.SaveChanges();
            return originalStudentData;
        }
    }
}
