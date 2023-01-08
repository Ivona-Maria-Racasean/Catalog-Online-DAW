using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Catalog_Online.Utils;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace Catalog_Online.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class LoginController : Controller
    {
        private readonly IUserService _userService;
        private readonly JwtHandler _jwtHandler;

        public LoginController(IUserService userService, JwtHandler jwtHandler)
        {
            _userService = userService;
            _jwtHandler = jwtHandler;
        }

        [HttpPost]
        public ActionResult<LoginResultDto> Login([FromBody] LoginDto loginInfo)
        {
            if(loginInfo == null) { return BadRequest(); }

            User user = _userService.GetUserByEmail(loginInfo.Email);

            if(user == null || !_userService.CheckPassword(user, loginInfo.Password)) {
                var badLoginResult = new LoginResultDto();
                badLoginResult.IsAuthSuccessful = false;
                badLoginResult.ErrorMessage = "Invalid login";

                return BadRequest(badLoginResult); 
            }

            var tokenLogin = new LoginResultDto();
            tokenLogin.IsAuthSuccessful = true;

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            tokenLogin.JWToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            
            return Ok(tokenLogin);
        }
    }
}
