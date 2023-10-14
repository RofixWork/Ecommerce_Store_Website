using Ecommerce_Website_APIs.DTOs;
using Ecommerce_Website_APIs.Entities;
using Ecommerce_Website_APIs.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Ecommerce_Website_APIs.Helpers.Responses;
namespace Ecommerce_Website_APIs.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        public AuthController(UserManager<User> userManager, IConfiguration configuration, IEmailSender emailSender)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]UserRegisterDTO userDTO)
        {
            //handle errors
            if(!ModelState.IsValid)
            {
                var errors = ModelState.SelectMany(e => e.Value!.Errors).Select(e => e.ErrorMessage).ToArray();

                return BadRequest(BadRequestResponse(errors));
            }

            //check email
            if (await _userManager.FindByEmailAsync(userDTO.Email!) is not null)
                return BadRequest(BadRequestResponse(new[] { "This Email already Exist, Please enter Another Email" }));

            //create user
            User newUser = new()
            {
                Name = userDTO.Name,
                UserName = userDTO.Email,
                Email = userDTO.Email,
                EmailConfirmed = false,
            };
            newUser.PasswordHash = _userManager.PasswordHasher.HashPassword(newUser, userDTO.Password!);

            //add user in DB
            IdentityResult isCreated = await _userManager.CreateAsync(newUser);

            if (isCreated.Succeeded)
            {
                //add role
                await _userManager.AddToRoleAsync(newUser, "user");
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                //create a link
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "auth", new { userId = newUser.Id, code = token }, Request.Scheme);

                var body = $"<a href=\"{confirmationLink}\">Click here for confirmation your Email</a>";

                //send email
                await _emailSender.Send(new Message(new MailboxAddress("email", newUser.Email), "Confirmation Email", body));

                return Ok(OkResponse("A verification link has sent to your email account"));
            }

            return BadRequest(BadRequestResponse(new[] { "User has been not created" }));
        }

        //confrimation email
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            //check url params
            if(userId is null || code is null)
                return BadRequest(BadRequestResponse(new[] { "Invalid URL Params" }));
            //find user
            var user = await _userManager.FindByIdAsync(userId);
            //check user
            if(user is null)
                return BadRequest(BadRequestResponse(new[] { "Invalid User Id Param" }));

            //confirm email
            var isConfirmation = await _userManager.ConfirmEmailAsync(user, code);

            if (isConfirmation.Succeeded)
                return Ok(OkResponse("Email Confirmation Succeeded"));

            //invalid confirmation
            return BadRequest(BadRequestResponse(new[] { "Invalid token on confirmation Email" }));
        }

        //login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]UserLoginDTO userDTO)
        {
            //handle errors
            if (!ModelState.IsValid)
            {
                var errors = ModelState.SelectMany(e => e.Value!.Errors).Select(e => e.ErrorMessage).ToArray();

                return BadRequest(BadRequestResponse(errors));
            }
            //find user
            var user = await _userManager.FindByEmailAsync(userDTO.Email!);
            //check email
            if (user is null)
                return BadRequest(BadRequestResponse(new[] { "Invalid Email OR Password" }));

            //check password
            if(!await _userManager.CheckPasswordAsync(user, userDTO.Password!))
                return BadRequest(BadRequestResponse(new[] { "Invalid Email OR Password" }));

            //check email confirmatio
            if(!user.EmailConfirmed)
                return BadRequest(BadRequestResponse(new[] { "This Email need Confirmation" }));

            //token
            var token = await GenerateToken(user);
            return Ok(new { status = 200, token });
        }

        //create clainms
        private async Task<List<Claim>> claims(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim("Id", user.Id),
                new Claim(ClaimTypes.Name, user.Name!),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            if(userRoles.Any())
            {
                foreach (var userRole in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole));
                }
            }
           
            return claims;
        }

        //craete token
        private async Task<string> GenerateToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:SecretKey").Value!);
            var jwtTokenHnadler = new JwtSecurityTokenHandler();
            var jwtTokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new(await claims(user)),
                Expires = DateTime.UtcNow.AddHours(5),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = jwtTokenHnadler.CreateToken(jwtTokenDescriptor);
            var jwt = jwtTokenHnadler.WriteToken(token);

            return jwt;
        }
    }
}

