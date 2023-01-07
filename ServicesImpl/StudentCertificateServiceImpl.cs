using Catalog_Online.Helper;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class StudentCertificateServiceImpl : IStudentCertificateService
    {
        RepositoryContext _context;

        public StudentCertificateServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        public StudentCertificate CreateStudentCertificate(StudentCertificate studentCertificate)
        {
            var newStudentCertificate = _context.StudentCertificates.Add(studentCertificate);
            _context.SaveChanges();
            return newStudentCertificate.Entity;
        }

        public StudentCertificate GetStudentCertificate(int id)
        {
            return _context.StudentCertificates.FirstOrDefault(sc => sc.Id == id);
        }
    }
}
