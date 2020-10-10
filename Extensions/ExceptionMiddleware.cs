using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Models;

namespace AngularDotNetNewTemplate.Extensions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private static ApplicationDbContext _context;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext, ApplicationDbContext dbcontext)
        {
            _context = dbcontext;
            try
            {              
                await _next(httpContext);
               
            }
            catch (Exception ex)
            {
                try
                {
                await HandleExceptionAsync(httpContext, ex);
                } catch (Exception LoggerException) // Ignore Logger failing, and just throw the original exception.
                {
                    throw ex;
                }
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

            var err = new LogGlobal()
            {
                Date= DateTime.Now,
                Exception = exception.Message,
                Level= "ERROR",
                Logger = exception.Source,
                Message = exception.StackTrace,
                Username = context.User.Identity.Name
            };

            _context.LogGlobals.Add(err);
            _context.SaveChanges();
            
            return context.Response.WriteAsync(exception.Message);
        }
    }
}
