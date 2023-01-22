using Catalog_Online.Models.Dtos.Transcript;
using Catalog_Online.Models.Entity;

namespace Catalog_Online.Services
{
    public interface IStudentDataService
    {
        public StudentData AddStudentData(StudentData studentData);

        public StudentData UpdateStudentData(StudentData studentData, int id);

        public StudentData GetByUserId(int id);

        public Transcript GetCurrentStudentsTranscript(User student);
    }
}
