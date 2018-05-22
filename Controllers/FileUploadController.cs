using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetNewTemplate.Controllers
{
    [Produces("application/json")]
    [Route("api/FileUpload")]
    public class FileUploadController : Controller
    {
        [HttpPost("UploadFile")]
        public IActionResult UploadFile()
        {

            return Ok();
        }


        [HttpPost("UploadFiles")]
        public async Task<IActionResult> Post(IFormFile file)
        {
            var filePath = Path.GetTempFileName();

            if (file.Length > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            //long size = file.Sum(f => f.Length);

            //full path to file in temp location
           

            //foreach (var formFile in file)
            //{
            //    if (formFile.Length > 0)
            //    {
            //        using (var stream = new FileStream(filePath, FileMode.Create))
            //        {
            //            await formFile.CopyToAsync(stream);
            //        }
            //    }
            //}

            //process uploaded files
            //Don't rely on or trust the FileName property without validation.

             return Ok(new { count = 1, filePath });

            // return Ok();
        }


    }
}