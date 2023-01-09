using Catalog_Online.Services;
using Catalog_Online.Models.Dto;
using Catalog_Online.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        } 

        [HttpPost]
        public ActionResult<User> Register([FromBody] RegisterDto registerDto)
        {
            User user = new()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                Password = registerDto.Password,
                Address = registerDto.Address,
                RoleId = 1
            };

            var result = _userService.RegisterUser(user);

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<User> GetUserById(int id) 
        {
            var result = _userService.GetUserById(id);

            return Ok(result);
        }

        [HttpGet]
        public ActionResult<List<User>> GetAllUsers()
        {
            return _userService.GetAllUsers();

        }

        [HttpGet("teachers")]
        public ActionResult<List<User>> GetTeachers()
        {
            return _userService.GetTeachers();

        }
    }
}
