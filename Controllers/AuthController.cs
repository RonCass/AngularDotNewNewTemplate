using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Models;
using AngularDotNetNewTemplate.Models.DTOOut;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Controllers
{
    public class AuthController : Controller
    {
        private ApplicationDbContext _context;
        private SignInManager<ApplicationUser> _signInMgr;
        private ILogger<AuthController> _logger;
        private UserManager<ApplicationUser> _userMgr;
        private IPasswordHasher<ApplicationUser> _hasher;
        private IConfiguration _config;

        public AuthController(ApplicationDbContext context, SignInManager<ApplicationUser> signInMgr, ILogger<AuthController> logger,
            UserManager<ApplicationUser> userMgr, IPasswordHasher<ApplicationUser> hasher, IConfiguration config)
        {
            _context = context;
            _signInMgr = signInMgr;
            _logger = logger;
            _userMgr = userMgr;
            _hasher = hasher;
            _config = config;
        }

        [HttpPost("api/auth/login")]
        public async Task<IActionResult> Login([FromBody] CredentialModel model)
        {
            try
            {
                //Creates a cookied and signs them in
                var result = await _signInMgr.PasswordSignInAsync(model.UserName, model.Password, false, false);
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown while logging in: {ex}");
            }

            return BadRequest("Failed To Login");
        }

        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await _signInMgr.SignOutAsync();
            }

            return Ok();
        }

        [HttpPost("Api/Auth/CreateToken")]
        public async Task<IActionResult> CreateToken([FromBody] CredentialModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _userMgr.FindByNameAsync(model.UserName);
                if (user != null)
                {                   

                    if (_hasher.VerifyHashedPassword(user, user.PasswordHash, model.Password) == PasswordVerificationResult.Success)
                    {
                        //Check IsActive Flag on user
                        if (!user.IsActive)
                        {
                            _logger.LogWarning("User is InActive");
                            return BadRequest("User has been deactivated. Please check with your adminstrator.");
                        }

                        //This will get the claims from the Identity System - Unioned on the var claims below
                        var userClaims = await _userMgr.GetClaimsAsync(user);

                        //These are custom claims if you need them somewhere else
                        var claims = new[]
                        {
                            new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                            new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            //Additional stuff you may want to keep in the token so you dont have to query the DB
                            new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, user.Email)
                        }.Union(userClaims);

                        //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("VERYLONGKEYVALUETHATISSECURE"));

                        //Using what I put in AppSettings
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        //Cred are good, create token
                        var token = new JwtSecurityToken(                           
                             issuer: _config["Token:Issuer"],
                            audience: _config["Token:Audience"],
                            claims: claims,
                            expires: DateTime.UtcNow.AddDays(2),
                            signingCredentials: creds
                            );

                        //Get User Info and send back with token
                        // var myUser = AutoMapper.Mapper.Map<UserAndRoleOut>(user);

                        //Map User Info out
                        UserAndRoleOut myUserAndRoleOut = new UserAndRoleOut();
                        myUserAndRoleOut = AutoMapper.Mapper.Map<UserAndRoleOut>(user);
                        //Get User Roles
                        var myUserRole = _context.UserRoles.Where(x => x.UserId == user.Id).FirstOrDefault();
                        if (myUserRole != null)
                        {
                            var myRole = _context.Roles.Where(x => x.Id == myUserRole.RoleId).FirstOrDefault();
                            if (myRole != null)
                            {
                                myUserAndRoleOut.RoleName = myRole.Name;                                
                            }
                        }

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo,
                            user = myUserAndRoleOut
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown while Creating Token in: {ex}");
            }

            return BadRequest("Failed To Create Token.");
        }

        //[Authorize(Policy = "AdminPolicy")]
        //[HttpGet("api/auth/TestClaimAuth")]
        //public IActionResult TestClaimAuth()
        //{
        //    return Ok("Your claim was authorized");
        //}

        [Authorize]
        [HttpGet("api/auth/GetUserClaims")]
        public IActionResult GetUserClaims()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<System.Security.Claims.Claim> claims = identity.Claims;
            return Ok(claims);
        }


        [Route("api/auth/GetIdentityInfo")]
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }




    }
}
