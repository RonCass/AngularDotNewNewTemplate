using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Models;
using AngularDotNetNewTemplate.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AngularDotNetNewTemplate.Controllers
{
    [Produces("application/json")]
    [Route("api/Logs")]
    public class LogsController : Controller
    {
        private IRepository<Log> _repo;
        private ILogger<LogsController> _logger;
        private ApplicationDbContext _appContext;

        public LogsController(
            IRepository<Log> repo,
            ILogger<LogsController> logger,
            ApplicationDbContext appContext
            )
        {
            _repo = repo;
            _logger = logger;
            _appContext = appContext;
        }

        [Route("GetLoggingLevel")]
        public IActionResult GetLoggingLevel()
        {

            var loggingService = new LoggingService()._loggingLevelSwitch;
            string myStringRepresentation = loggingService.MinimumLevel.ToString();

            return Json(new
            {
                minimumLoggingLevel = myStringRepresentation
            });
        }

        [Route("ChangeLoggingLevel")]
        public IActionResult ChangeLoggingLevel(string logEventLevel)
        {
            if (string.IsNullOrEmpty(logEventLevel))
            {
                return BadRequest();
            }

            var loggingService = new LoggingService();
            bool isSuccess = loggingService.SetLoggingLevel(logEventLevel);

            if (isSuccess)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [Route("CreateTestLogEntries")]
        public IActionResult CreateTestLogEntries()
        {
            //throw new Exception("Ron Testing Exception");

            //Log Level Switching Test
            _logger.LogInformation("Logged INFORMATION");
            _logger.LogDebug("Logged DEBUG");
            _logger.LogError("Logged ERROR");
            _logger.LogCritical("Critical Error");

            //var UserEmail = HttpContext.User.Identity.Name;
            _logger.LogInformation($"TESTUSER|LogsController|CreateTestLogEntries()|Started");

            return Ok("Entries have been created");
        }

        [Route("GetLogs")]
        public IActionResult GetLogs([FromQuery]int pageNumber = 1, [FromQuery]int pageSize = 20,
            [FromQuery]string sort = "Id", [FromQuery]string fields = null, string userId = null, string level = null)
        {
            try
            {
                IQueryable<Log> myEntities = _appContext.Log;

                if (userId != null)
                {
                    myEntities = myEntities.Where(x => x.UserId == userId);
                };

                if (level != null)
                {
                    myEntities = myEntities.Where(x => x.Level == level);
                }

                var totalCount = myEntities.Count();
                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                var results = myEntities
                    .ApplySort(sort)
                    .Skip(pageSize * (pageNumber - 1))
                    .Take(pageSize);

                return Json(new
                {
                    TotalCount = totalCount,
                    TotalPages = totalPages,
                    Data = results
                });

            }
            catch (Exception ex)
            {
                _logger.LogError("Error Getting Log Files Ex={ex}", ex);
                return StatusCode(500);
            }

        }
    }
}