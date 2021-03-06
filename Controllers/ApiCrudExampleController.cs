﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Models;
using AngularDotNetNewTemplate.Models.DTOIn;
using AngularDotNetNewTemplate.Models.DTOOut;
using AngularDotNetNewTemplate.Utils;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AngularDotNetNewTemplate.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ApiCrudExampleController : BaseApiController
    {
        private IRepository<APICrudExample> _repo;
        private ILogger<ApiCrudExampleController> _logger;
        private IMapper _mapper;

        public ApiCrudExampleController(
                IRepository<APICrudExample> repo,
                ILogger<ApiCrudExampleController> logger,
                IMapper mapper
            )
        {
            _repo = repo;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get([FromQuery]int pageNumber = 1, [FromQuery]int pageSize = 200,
            [FromQuery]string sort = "Id", [FromQuery]string fields = null)
        {
            PagedList<APICrudExample> myEntities;

            myEntities = _repo.GetAll(null, pageNumber, pageSize, sort);

            var myEntityOut = _mapper.Map<IEnumerable<APICrudExampleOut>>(myEntities.ListItems);

            //Shape data being returned
            return Ok(myEntityOut.ShapeData(fields));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id, string fields = null)
        {
            var myEntity = _repo.Get(x => x.Id == id);

            if (myEntity == null)
            {
                return NotFound();
            }

            var myEntityOut = _mapper.Map<APICrudExampleOut>(myEntity);

            return Ok(myEntityOut.ShapeData(fields));
        }

        [HttpPost]
        public IActionResult Create([FromBody] APICrudExampleIn myEntityIn)
        {
            //Check if the object got mapped correctly
            if (myEntityIn == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var myEntity = _mapper.Map<APICrudExample>(myEntityIn);

            //Map the full new entity back to the Out DTO for returning to the client
            var myEntityOut = _mapper.Map<APICrudExampleOut>(myEntity);

            return CreatedAtRoute(
                "Get",
                new { id = myEntityOut.Id },
                myEntityOut);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] APICrudExample entityIn)
        {

            //Check if the object got mapped correctly
            if (entityIn == null)
            {
                return BadRequest();
            }


            if (!ModelState.IsValid)
            {
                //Returns a 422
                return new Utils.UnprocessableEntityObjectResult(ModelState);
            }

            //Check if Entity Exists
            var myEntity = _repo.Get(x => x.Id == id);

            if (myEntity == null)
            {
                return NotFound();
            }

            _mapper.Map(entityIn, myEntity);

            _repo.Update(myEntity);

            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult PartiallyUpdate(int id, [FromBody] JsonPatchDocument<APICrudExampleIn> patchItem)
        {
            if (patchItem == null)
            {
                return BadRequest();
            }

            var myEntity = _repo.Get(x => x.Id == id);
            if (myEntity == null)
            {
                return NotFound();
            }

            var myItemToPatch = _mapper.Map<APICrudExampleIn>(myEntity);

            patchItem.ApplyTo(myItemToPatch);

            //Add Validation

            _mapper.Map(myItemToPatch, myEntity);

            _repo.Update(myEntity);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var myEntity = _repo.Get(x => x.Id == id);

            if (myEntity == null)
            {
                return NotFound();
            }

            _repo.Delete(myEntity);
            return NoContent();
        }
    }
}