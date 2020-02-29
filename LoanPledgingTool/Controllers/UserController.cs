using auth.Service;
using LoanPledgingTool.Dtos;
using LoanPledgingTool.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanPledgingTool.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Logging]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userParam)
        {
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Incorrect username or password" });

            return Ok(user);
        }
    }
}