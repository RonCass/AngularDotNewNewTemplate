using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetNewTemplate.Controllers
{
    public class ApiCrudExampleController : BaseApiController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}