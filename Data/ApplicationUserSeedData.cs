using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using AngularDotNetNewTemplate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Data
{
    public class ApplicationUserSeedData
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private ApplicationRoleManager _roleManager;

        public ApplicationUserSeedData(ApplicationDbContext context, UserManager<ApplicationUser> userManager, ApplicationRoleManager roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public static async Task EnsureSeedDataAsync(ApplicationDbContext _context, ApplicationRoleManager _roleManager, UserManager<ApplicationUser> _userManager)       
        {
          

            _context.Database.EnsureCreated();

            //Add Default Roles
            EnsureRoleCreated("SuperAdmin", _context, _roleManager);
            EnsureRoleCreated("Admin", _context, _roleManager);           
            EnsureRoleCreated("User", _context, _roleManager);
            

            if (await _userManager.FindByEmailAsync("SuperAdmin@MyWebsite.com") == null)
            {
                //Add New User
                var newUser = new ApplicationUser()
                {
                    UserName = "SuperAdmin@MyWebsite.com",
                    Email = "SuperAdmin@MyWebsite.com",
                    FirstName = "John",
                    LastName = "Doe"
                };

                await _userManager.CreateAsync(newUser, "SomePassword");
                await _userManager.AddToRoleAsync(newUser, "SuperAdmin");
                //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));
            }

            if (await _userManager.FindByEmailAsync("Admin@MyWebsite.com") == null)
            {
                //Add Admin New User
                var newUser = new ApplicationUser()
                {
                    UserName = "Admin@MyWebsite.com",
                    Email = "Admin@MyWebsite.com",
                    FirstName = "Admin",
                    LastName = "Doe"
                };

                await _userManager.CreateAsync(newUser, "SomePassword");
                await _userManager.AddToRoleAsync(newUser, "Admin");
                //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));               
            }

            if (await _userManager.FindByEmailAsync("User@MyWebsite.com") == null)
            {
                //Add New User
                var newUser = new ApplicationUser()
                {
                    UserName = "User@MyWebsite.com",
                    Email = "User@MyWebsite.com",
                    FirstName = "User",
                    LastName = "Doe"                    
                };

                await _userManager.CreateAsync(newUser, "SomePassword");
                await _userManager.AddToRoleAsync(newUser, "User");
                //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));               
            }

            AddDefaultData();
        }

        public static void AddDefaultData()
        {           


        }

        private static void EnsureRoleCreated(string roleName, ApplicationDbContext _context, ApplicationRoleManager _roleManager)
        {
            try
            {
                if (_context.Roles.FirstOrDefault(x => x.Name == roleName) == null)
                {
                    var myAppRole = new ApplicationRole();
                    myAppRole.Name = roleName;
                    _roleManager.CreateAsync(myAppRole).Wait();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
