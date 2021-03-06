﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetNewTemplate.Controllers
{
    public class MyModelWithOneFile
    {
        public string MyField1 { get; set; }
        public string MyField2 { get; set; }
        public IFormFile File { get; set; }
    }
  
    [Produces("application/json")]
    [Route("api/FileUpload")]
    public class FileUploadController : Controller
    {
        private IHostingEnvironment _hostingEnvironment;

        public FileUploadController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpPost("UploadOneFileOnly")]
        public async Task<IActionResult> UploadOneFileOnly(IFormFile file)
        {
            //Get Path to wwwroot folder of application
            var webRootPath = _hostingEnvironment.WebRootPath;

            //Combine wwwroot folder, new folder to hold the items (NEW FOLDER MUST BE CREATED ALREDY), and the files actual name
            var filePath = Path.Combine(webRootPath, "UploadTesting", file.FileName);

            //Using Temp File Name and Path
            //var filePath = Path.GetTempFileName();

            if (file.Length > 0)
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {                    
                    await file.CopyToAsync(stream);
                }
            }
           
            return Ok();
        }

        [HttpPost("UploadOneFileAndOtherModelData")]
        public async Task<IActionResult> UploadOneFileAndOtherModelData(MyModelWithOneFile modelWithFile)
        {
            var myField1Value = modelWithFile.MyField1;
            var myField2Value = modelWithFile.MyField2;

            if(modelWithFile.File != null)
            {
                //Get Path to wwwroot folder of application
                var webRootPath = _hostingEnvironment.WebRootPath;

                //Combine wwwroot folder, new folder to hold the items (NEW FOLDER MUST BE CREATED ALREDY), and the files actual name
                var filePath = Path.Combine(webRootPath, "UploadTesting", modelWithFile.File.FileName);


                //var filePath = Path.GetTempFileName();

                if (modelWithFile.File.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await modelWithFile.File.CopyToAsync(stream);
                    }
                }
            }            

            return Ok();
        }

        [HttpPost("UploadMultipleFiles")]
        public async Task<IActionResult> UploadMultipleFiles()
        {
            //Tried to use Model Binding above - List<IFormFile> files But cant seem to get it to populate with Model Binding above with any [FromBody], [FromForm] etc. 
            // But this works below
            List<IFormFile> files = HttpContext.Request.Form.Files.ToList();

            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            //var filePath = Path.GetTempFileName();

            foreach (var formFile in files)
            {
                //Get Path to wwwroot folder of application
                var webRootPath = _hostingEnvironment.WebRootPath;

                //Combine wwwroot folder, new folder to hold the items (NEW FOLDER MUST BE CREATED ALREDY), and the files actual name
                var filePath = Path.Combine(webRootPath, "UploadTesting", formFile.FileName);

                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok();
        }


    }
}