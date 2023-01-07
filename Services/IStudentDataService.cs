using Catalog_Online.Models.Entity;

namespace Catalog_Online.Services
{
    public interface IStudentDataService
    {
        public StudentData AddStudentData(StudentData studentData);

        public StudentData UpdateStudentData(StudentData studentData, int id);

        public StudentData GetByUserId(int id);
    }
}
