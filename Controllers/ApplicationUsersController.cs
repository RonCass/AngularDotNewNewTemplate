using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Models;
using AngularDotNetNewTemplate.Models.DTOIn;
using AngularDotNetNewTemplate.Models.DTOOut;
using AngularDotNetNewTemplate.Utils;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AngularDotNetNewTemplate.Controllers
{
    [Produces("application/json")]
    [Route("api/ApplicationUsers")]
    //[Authorize(Roles = "Admin")]
    public class ApplicationUsersController : BaseApiController
    {
        private ApplicationDbContext _context;
        private ILogger<ApplicationUsersController> _logger;
        private IMapper _mapper;
        private UserManager<ApplicationUser> _userManager;

        public ApplicationUsersController(ApplicationDbContext context, ILogger<ApplicationUsersController> logger, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult Get(int page = 1, int pageSize = 20, string sort = "Id", bool isActive = true, string userName = null, string fields = null)
        {            
            try
            {                
                //Default Page Size checking -BaseApiController
                pageSize = pageSize > MaxPageSize ? MaxPageSize : pageSize;

                //Filtering
                var baseQuery = _context.Users
                       .Where(x => x.IsActive == isActive)
                       .Where(x => (userName == null || x.UserName == userName));

                // Calculate data for metadata
                var totalCount = baseQuery.Count();
                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                var results = baseQuery
                    .ApplySort(sort)
                    .Skip(pageSize * (page - 1))
                    .Take(pageSize)
                    .Select(x => ShapeReturnData.CreateDataShapedObject(x, fields));
                
                //Map data to Out DTO
                var myEntitiesOut = _mapper.Map<IEnumerable<ApplicationUserOut>>(results);

                return Json(new
                {
                    TotalCount = totalCount,
                    TotalPages = totalPages,
                    Data = myEntitiesOut
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex}");
                return StatusCode(500);                
            }
        }

        // GET: api/Users/?id=5
        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {                   
                    return BadRequest(ModelState);
                }

                ApplicationUser users = _context.ApplicationUser
                    .Include(x => x.ApplicationUserRoles)    
                    .ThenInclude(x => x.ApplicationRole)
                    .FirstOrDefault(x => x.Id == id);
                                

                if (users == null)
                {                    
                    return NotFound();
                }
             
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex}");
                throw;
            }
        }

        [HttpGet("GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                var roles = _context.ApplicationRole.Where(x => x.Name != "SuperAdmin");

                return Ok(roles);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex}");
                throw;
            }
        }

        // PUT: api/Users/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUsers([FromRoute] int id, [FromBody] ApplicationUserIn users)
        //{
        //    string userID = "";
        //    if (HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) != null)
        //    {
        //        userID = HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;
        //    }

        //    try
        //    {
        //        _logger.LogInformation($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|Started");
        //        _logger.LogDebug($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|id={id},users={Utility.JsonString(users)}");

        //        if (!ModelState.IsValid)
        //        {
        //            _logger.LogInformation($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|return BadRequest(ModelState);");
        //            return BadRequest(ModelState);
        //        }

        //        if (id != users.UserId)
        //        {
        //            _logger.LogInformation($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|return BadRequest();");
        //            return BadRequest();
        //        }

        //        _context.Entry(users).State = EntityState.Modified;

        //        try
        //        {
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException ex)
        //        {
        //            if (!UsersExists(id))
        //            {
        //                _logger.LogError($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|Error: {ex}");
        //                return NotFound();
        //            }
        //            else
        //            {
        //                _logger.LogError($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|Error: {ex}");
        //                return StatusCode(500);
        //            }
        //        }

        //        _logger.LogInformation($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|return NoContent();");
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"{userID}|UsersController|PutUsers([FromRoute] int id, [FromBody] Users users)|Error: {ex}");
        //        return StatusCode(500);
        //    }
        //}

        // POST: api/ApplicationUsers
        [HttpPost]
        public async Task<IActionResult> PostUsers([FromBody] ApplicationUserIn applicationUserIn)
        {
            string userID = "";
            if (HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) != null)
            {
                userID = HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;
            }

            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var newApplicationUser = new ApplicationUser();

                //Map fields from DTO to actual ApplicationUser
                _mapper.Map(applicationUserIn, newApplicationUser);

                //Set Username same as email
                newApplicationUser.UserName = newApplicationUser.Email;
                //Set Date Created
                newApplicationUser.DateCreated = DateTime.Now;
                //Set Date Modified
                newApplicationUser.DateLastModified = DateTime.Now;


                var myResult = await _userManager.CreateAsync(newApplicationUser, applicationUserIn.Password);
                if (!myResult.Succeeded)
                {
                    string myErrors = "";

                    foreach (var error in myResult.Errors)
                    {
                        myErrors = myErrors + error.Description;
                    }

                    return BadRequest(myErrors);
                }

                var myResult2 = await _userManager.AddToRoleAsync(newApplicationUser, applicationUserIn.RoleName);
                if (!myResult2.Succeeded)
                {
                    string myErrors = "";

                    foreach (var error in myResult2.Errors)
                    {
                        myErrors = myErrors + error.Description;
                    }

                    return BadRequest(myErrors);
                }

                return Ok(newApplicationUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Users/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUsers([FromRoute] int id)
        //{
        //    string userID = "";
        //    if (HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier) != null)
        //    {
        //        userID = HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;
        //    }

        //    try
        //    {
        //        _logger.LogInformation($"{userID}|UsersController|public async Task<IActionResult> DeleteUsers([FromRoute] int id)|Started");
        //        _logger.LogDebug($"{userID}|UsersController|public async Task<IActionResult> DeleteUsers([FromRoute] int id)|id={id}");

        //        if (!ModelState.IsValid)
        //        {
        //            _logger.LogInformation($"{userID}|UsersController|public async Task<IActionResult> DeleteUsers([FromRoute] int id)|return BadRequest(ModelState);");
        //            return BadRequest(ModelState);
        //        }

        //        Users users = await _context.Users.SingleOrDefaultAsync(m => m.UserId == id);
        //        if (users == null)
        //        {
        //            _logger.LogInformation($"{userID}|UsersController|public async Task<IActionResult> DeleteUsers([FromRoute] int id)|return NotFound();");
        //            return NotFound();
        //        }

        //        _context.Users.Remove(users);
        //        await _context.SaveChangesAsync();

        //        _logger.LogInformation($"{userID}|UsersController|public async Task<IActionResult> DeleteUsers([FromRoute] int id)|return Ok(users);");
        //        return Ok(users);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"{userID}|UsersController|public async Task<IActionResult> DeleteUsers([FromRoute] int id)|Error: {ex}");
        //        throw;
        //    }
        //}

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

    }
}