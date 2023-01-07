using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Mvc;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentCertificateController : ControllerBase
    {
        IStudentCertificateService  _studentCertificateService;

        public StudentCertificateController(IStudentCertificateService studentCertificateService) 
        { 
            _studentCertificateService = studentCertificateService;    
        }

        [HttpGet("{id:int}")]
        public ActionResult<StudentCertificate> GetById(int id) {
            var result = _studentCertificateService.GetStudentCertificate(id);

            return Ok(result);
        }


        [HttpPost]
        public ActionResult<StudentCertificate> CreateStudentCertificate([FromBody] StudentCertificateDto dto) 
        {
            StudentCertificate studentCertificate = new()
            {
                UserId = dto.UserId,
                Details = dto.Details
            };

            var result = _studentCertificateService.CreateStudentCertificate(studentCertificate);
            return Ok(result);
        }
    }
}
