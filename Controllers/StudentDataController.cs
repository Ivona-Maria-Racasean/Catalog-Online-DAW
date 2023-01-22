using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Dtos.Transcript;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDataController : ControllerBase
    {

        IStudentDataService _studentDataService;
        IUserService _userService;

        public StudentDataController(IStudentDataService studentDataService, IUserService userService)
        {
            _studentDataService = studentDataService;
            _userService = userService;
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

        [HttpGet("transcript")]
        [Authorize]
        public ActionResult<Transcript> GetCurrentStudentTranscript()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (email == null)
                return BadRequest("WrongToken!");

            var user = _userService.GetUserByEmail(email);

            return _studentDataService.GetCurrentStudentsTranscript(user);
        }
        
    }
}
