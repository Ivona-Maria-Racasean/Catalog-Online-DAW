using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entities;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;
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
                YearOfTeaching = dto.YearOfTeaching,
                TeacherName = dto.TeacherName
            };

            var result = _subjectService.AddSubject(subject);
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<Subject>> GetSubjects()
        {
            return this._subjectService.GetAllSubjects();
        }

        [HttpGet("subjectsAndUsers")]
        [Authorize]
        public ActionResult<Dictionary<int, SubjectsStudents>> GetAllSubjectsAndUsers() {

            Dictionary<int, SubjectsStudents> subject2Students = new();

            var subjects = _subjectService.GetAllSubjects();
            subjects.ForEach(subject => {
                var subjectsStudents = this._subjectService.GetSubjectStudent(subject);
                subject2Students.Add(subject.Id, subjectsStudents);
            });

            return subject2Students;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("addStudent/{studentId}")]
        public IActionResult AddStudentToSubject([FromBody] Subject subject, int studentId)
        {
            if(subject == null)
            {
                return BadRequest();
            }

            var addedMark = _subjectService.AddStudentToSubject(subject, studentId);

            if(addedMark == null)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete]
        [Authorize(Roles="Admin")]
        public IActionResult DeleteSubject([FromBody] Subject subjectToBeDeleted)
        {
            _subjectService.DeleteSubject(subjectToBeDeleted);
            return Ok();
        }

        [HttpDelete("removeStudent/{studentId}/{subjectId}")]
        public IActionResult RemoveStudentFromSubject(int studentId, int subjectId) {
            _subjectService.RemoveStudentFromSubject(subjectId, studentId);
            return Ok();
        }
    }
}