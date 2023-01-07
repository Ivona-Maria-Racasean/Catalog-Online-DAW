using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<Teacher> GetTeacherByUserId(int id)
        {
            var result = _teacherService.GetByUserId(id);

            return Ok(result);  
        }

        [HttpPost]
        public ActionResult<Teacher> AddTeacherData([FromBody] TeacherDto dto)
        {
            Teacher teacher = new()
            {
                Title = dto.Title,
                UserId = dto.UserId,
            };

            var result = _teacherService.AddTeacherData(teacher);
            return Ok(result);
        }

    }
}
