using Catalog_Online.Models.Entity;

namespace Catalog_Online.Services
{
    public interface IStudentCertificateService
    {
        public StudentCertificate CreateStudentCertificate(StudentCertificate studentCertificate);

        public StudentCertificate GetStudentCertificate(int id);
    }
}
