using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkController : ControllerBase
    {
        IMarkService _markService;

        public MarkController(IMarkService markService)
        {
            _markService = markService;
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

        [HttpGet("{id:int}")]
        public ActionResult<List<GetMarkWithSubjectDto>> GetMarksByUserId(int id)
        {
            return _markService.GetMarksByUserId(id);
        }
    }
}
