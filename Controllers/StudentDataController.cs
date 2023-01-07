using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Mvc;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDataController : ControllerBase
    {

        IStudentDataService _studentDataService;

        public StudentDataController(IStudentDataService studentDataService)
        {
            _studentDataService = studentDataService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<StudentData> GetStudentDataByUserId(int id)
        {
            var result = _studentDataService.GetByUserId(id);

            return Ok(result);
        }

        [HttpPost]
        public ActionResult<StudentData> AddStudentData([FromBody] StudentDataDto dto)
        {
            StudentData studentData = new()
            {
                UserId = dto.UserId,
                YearOfStudying = dto.YearOfStudying,
                RegistrationNumber = dto.RegistrationNumber,
                Class = dto.Class
            };

            var result = _studentDataService.AddStudentData(studentData); 
            return Ok(result);
        }

        [HttpPatch("{id:int}")] 
        public ActionResult<StudentData> UpdateStudentData([FromBody] StudentDataDto dto, int id) 
        { 
            StudentData studentData = new()
            {
                Id = id,
                UserId = dto.UserId,
                YearOfStudying = dto.YearOfStudying,
                RegistrationNumber = dto.RegistrationNumber,
                Class = dto.Class
            };

            var result = _studentDataService.UpdateStudentData(studentData, id);
            return Ok(result);
        }
            
    }
}
