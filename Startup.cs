using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Models;
using AngularDotNetNewTemplate.Models.DTOIn;
using AngularDotNetNewTemplate.Models.DTOOut;
using AngularDotNetNewTemplate.Utils;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using Serilog;
using Serilog.Core;
using Serilog.Events;

using Serilog.Sinks.MSSqlServer;
using System;
using System.Collections.ObjectModel;
using System.Data;
using System.Diagnostics;
using System.Text;

namespace AngularDotNetNewTemplate
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public static LoggingLevelSwitch loggingLevelSwitch = new LoggingLevelSwitch();

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            #region Serilog Configurations
            //Serilog Debugging, if needed - Writes to the output - Debug window
            //Serilog.Debugging.SelfLog.Enable(msg => Debug.WriteLine(msg));

            //Dynamic Logging Level Switch/Changer Ron C. 3-12-2018           
            loggingLevelSwitch.MinimumLevel = LogEventLevel.Debug;

            //3-13-2018 Ron C.: Adding specific columns to the Serilog MS SQL Output
            var columnOptions = new ColumnOptions
            {
                AdditionalDataColumns = new Collection<DataColumn>
                {
                    new DataColumn {DataType = typeof (string), ColumnName = "UserId"},
                    new DataColumn {DataType = typeof (string), ColumnName = "RequestPath"},
                    new DataColumn {DataType = typeof (string), ColumnName = "SourceContext"},
                    new DataColumn {DataType = typeof (string), ColumnName = "ActionId"},
                    new DataColumn {DataType = typeof (string), ColumnName = "ActionName"},
                    new DataColumn {DataType = typeof (string), ColumnName = "RequestId"}
                }
            };

            //3-13-2018 Ron C.:  Don't include the Properties XML column.
            columnOptions.Store.Remove(StandardColumn.Properties);

            // 3-13-2018 Ron C.: Do include the log event data as JSON.
            columnOptions.Store.Add(StandardColumn.LogEvent);

            // 10-10-2016 Ron C.: Added for Serilog - need to log to file
            // 3-15-2018 Ron C.: Updated to log to database and added Serilog middleware for logging
            Serilog.Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                //.ReadFrom.Configuration(Configuration.GetSection("Logging"))
                .WriteTo.MSSqlServer(Configuration.GetConnectionString("DefaultConnection"), "Log", columnOptions: columnOptions)
                .MinimumLevel.ControlledBy(loggingLevelSwitch)
                .MinimumLevel.Override("Microsoft", LogEventLevel.Error)
                .MinimumLevel.Override("System", LogEventLevel.Error)                               
                .CreateLogger();
            #endregion
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, ApplicationRole>()
              .AddEntityFrameworkStores<ApplicationDbContext>()
              .AddDefaultTokenProviders()
              .AddRoleManager<ApplicationRoleManager>()
              ;

            services.AddAuthentication(authOptions =>
            {
                authOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    ValidIssuer = Configuration["Token:Issuer"],
                    ValidAudience = Configuration["Token:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:Key"])),
                    ValidateLifetime = true
                };
            });

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;

                // User settings
                options.User.RequireUniqueEmail = true;

            });

            services.AddMvc()
               .AddJsonOptions(opt =>
               {
                   opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                   opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
               });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            //Used with Repository Pattern
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //Automapper Mappings
            Mapper.Initialize(config =>
            {
                config.CreateMap<ApplicationUser, ApplicationUserIn>().ReverseMap();
                config.CreateMap<ApplicationUser, ApplicationUserOut>();              

            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //Serilog          
            app.UseMiddleware<SerilogMiddleware>();

            // 5-2-2018: Added this to use the new Authentication
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //3-23-2018 Ron C: 
                    //This will build the C# code and run the angular compiler
                    //spa.UseAngularCliServer(npmScript: "start");

                    // 3 - 23 - 2018 Ron C: 
                    //This will allow me to run the angular app in a different command window and still allow for a ctrl-f5 to build the C#. 
                    //The Angular will still get auto updated as well. You have to do an "ng serve" in the ClientApp folder.
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
