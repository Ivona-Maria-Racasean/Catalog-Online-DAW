using Catalog_Online.Services;
using Catalog_Online.Models.Dto;
using Catalog_Online.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Catalog_Online.Models.Dtos;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserService _userService;
        IStudentDataService _studentDataService;

        public UserController(IUserService userService, IStudentDataService studentDataService)
        {
            _userService = userService;
            _studentDataService = studentDataService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
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
                RoleId = registerDto.RoleId
            };

            var result = _userService.RegisterUser(user);

            if(user.RoleId == 1)
            {
                StudentData studentData= new StudentData();
                studentData.UserId = result.Id;
                studentData.Class = registerDto.Class;
                studentData.RegistrationNumber = registerDto.RegistrationNumber;
                studentData.YearOfStudying = registerDto.YearOfStudy;
                _studentDataService.AddStudentData(studentData);
            }

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<User> GetUserById(int id)
        {
            var result = _userService.GetUserById(id);

            return Ok(result);
        }

        [HttpPatch("Update/{id:int}")]
        public ActionResult<User> UpdateUserData([FromBody] UpdateUserDto dto, int id)
        {
            User user = new()
            {
                Id = id,
                RoleId = dto.RoleId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
            };

            var result = _userService.UpdateUserData(user, id);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<User> DeleteUserData(int id)
        {
 
            var result = _userService.DeleteUserData(id);
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

        [HttpGet("StudentData")]
        public ActionResult<List<StudentUserListing>> GetAllStudentUsersData()
        {
            return _userService.GetAllStudentUsersData();

        }

        [HttpGet("UserRol")]
        public ActionResult<List<UserRolDto>> GetAllUserData()
        {
            return _userService.GetAllUserData();

        }

        [HttpGet("GetCurrentUser"), Authorize]
        public IActionResult GetCurrentUser()
        {
            // Ne folosim de variabila de sistem User pentru a
            // obtine Claimurile setate in token
            var identity = (ClaimsIdentity) User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if(email == null)
                return BadRequest("WrongToken!");
            
            var user = _userService.GetUserByEmail(email);

            return Ok(new
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                role = _userService.GetUserRole(user).Name
            });
        }

       
    }
}
