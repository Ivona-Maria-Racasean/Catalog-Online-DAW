using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [HttpGet("{semester}/{year}")]
        public ActionResult<List<Subject>> GetAllBySemesterAndYear(string Semester, string Year)
        {
            return _subjectService.GetAllBySemesterAndYear(Semester, Year);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Subject> AddSubject([FromBody] SubjectDto dto)
        {
            Subject subject = new()
            {
                TeacherId = dto.TeacherId,
                Name = dto.Name,
                Semester = dto.Semester,
                YearOfTeaching = dto.YearOfTeaching
            };

            var result = _subjectService.AddSubject(subject);
            return Ok(result);
        }
    }
}