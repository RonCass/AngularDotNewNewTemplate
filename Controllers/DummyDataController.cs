using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Models;
using AngularDotNetNewTemplate.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AngularDotNetNewTemplate.Controllers
{
    [Produces("application/json")]
    [Route("api/DummyData")]
    public class DummyDataController : Controller
    {
        private IRepository<DummyData> _repo;
        private ILogger<DummyDataController> _logger;

        public DummyDataController(IRepository<DummyData> repo, ILogger<DummyDataController> logger)
        {
            _repo = repo;
            _logger = logger;
        }
       
        public IActionResult Get([FromQuery]int pageNumber = 1, [FromQuery]int pageSize = 1000, string sort = "Id")
        {
            PagedList<DummyData> myEntities;

            myEntities = _repo.GetAll(null, pageNumber, pageSize, sort);

            return Ok(myEntities);
        }

    }
}