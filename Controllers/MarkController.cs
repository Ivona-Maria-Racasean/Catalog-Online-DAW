using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkController : ControllerBase
    {
        IMarkService _markService;
        IUserService _userService;

        public MarkController(IMarkService markService, IUserService userService)
        {
            _markService = markService;
            _userService = userService;
        }

        [HttpPost]
        public ActionResult<Mark> AddMark([FromBody] MarkDto dto)
        {
            Mark mark = new()
            {
                SubjectId = dto.SubjectId,
                UserId = dto.UserId,
                Value = dto.Value
            };

            var result = _markService.AddMark(mark);
            return Ok(result);
        }

        [HttpGet("{email}")]
        public ActionResult<User> GetUserByEmail(string email)
        {
            var result = _markService.GetUserByEmail(email);

            return Ok(result);
        }


        [HttpGet("{id:int}")]
        public ActionResult<List<GetMarkWithSubjectDto>> GetMarksByUserId(int id)
        {
            return _markService.GetMarksByUserId(id);
        }

       // [Authorize]
        [HttpGet("subject")]
        public ActionResult<List<Subject>> GetSubjectsByCurrentTeacher()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (email == null)
                return BadRequest("WrongToken!");

            var user = _userService.GetUserByEmail(email);
            return _markService.GetSubjectsByCurrentTeacher(user);
        }

        
       
        [HttpGet("marksSubject/{subjectId:int}")]
        public ActionResult<List<GetMarksBySubjectDto>> GetMarksByCurrentSubjectId(int subjectId)
        {
            return _markService.GetMarksByCurrentSubjectId(subjectId);
        }
    }
}
