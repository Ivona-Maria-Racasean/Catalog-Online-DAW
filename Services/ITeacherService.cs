using Catalog_Online.Models.Entity;

namespace Catalog_Online.Services
{
    public interface ITeacherService
    {
        public Teacher AddTeacherData(Teacher teacher);

        public Teacher GetByUserId(int id);
    }
}
