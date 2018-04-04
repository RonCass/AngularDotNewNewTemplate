using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetNewTemplate.Controllers
{
    
    public abstract class BaseApiController : Controller
    {
        public BaseApiController()
        {

        }
        
        //TODO: Make this configurable, so it can be changed easily
        protected int MaxPageSize
        {
            get
            {
                return 500;
            }
        }
    }
}