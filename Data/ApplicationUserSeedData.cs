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

        public static async Task EnsureSeedDataAsync(ApplicationDbContext _context, ApplicationRoleManager _roleManager, UserManager<ApplicationUser> _userManager, IServiceProvider serviceProvider)       
        {
          

            _context.Database.EnsureCreated();

            //Add Default Roles
            EnsureRoleCreated("SuperAdmin", _context, _roleManager);
            EnsureRoleCreated("Admin", _context, _roleManager);           
            EnsureRoleCreated("User", _context, _roleManager);


            try
            {
                if (await _userManager.FindByEmailAsync("SuperAdmin@MyWebsite.com") == null)
                {
                    //var adminID = await EnsureUser(serviceProvider, _userManager, "asdasd1!!", "admin@contoso.com");


                    //Add New User
                    var newUser = new ApplicationUser()
                    {
                        UserName = "SuperAdmin@MyWebsite.com",
                        Email = "SuperAdmin@MyWebsite.com",
                        FirstName = "John",
                        LastName = "Doe",
                        SecurityStamp = Guid.NewGuid().ToString("D")
                    };


                    await _userManager.CreateAsync(newUser, "SomePassword1!");
                    await _userManager.AddToRoleAsync(newUser, "SuperAdmin");
                    //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));
                }

                if (await _userManager.FindByEmailAsync("Admin@MyWebsite.com") == null)
                {
                    //Add Admin New User
                    var newUser2 = new ApplicationUser()
                    {
                        UserName = "Admin@MyWebsite.com",
                        Email = "Admin@MyWebsite.com",
                        FirstName = "Admin",
                        LastName = "Doe",
                        SecurityStamp = Guid.NewGuid().ToString("D")
                    };

                    await _userManager.CreateAsync(newUser2, "SomePassword1!");
                    await _userManager.AddToRoleAsync(newUser2, "Admin");
                    //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));               
                }

                if (await _userManager.FindByEmailAsync("User@MyWebsite.com") == null)
                {
                    //Add New User
                    var newUser3 = new ApplicationUser()
                    {
                        UserName = "User@MyWebsite.com",
                        Email = "User@MyWebsite.com",
                        FirstName = "User",
                        LastName = "Doe",
                        SecurityStamp = Guid.NewGuid().ToString("D")
                    };

                    await _userManager.CreateAsync(newUser3, "SomePassword1!");
                    await _userManager.AddToRoleAsync(newUser3, "User");
                    //await _userManager.AddClaimAsync(newUser, new System.Security.Claims.Claim("CanEdit", "true"));               
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            AddDefaultData(_context);
        }

        public static void AddDefaultData(ApplicationDbContext _context)
        {

            if (!_context.DummyData.Any())
            {
                for (int i = 1; i < 51; i++)
                {
                    var myRow = new DummyData() { Col1 = "Col1 Row" + i, Col2 = "Col2Row" + i, Col3 = "Col3Row" + i };
                    _context.DummyData.Add(myRow);
                }

                _context.SaveChanges();
            }
        }

        private static async Task<int> EnsureUser(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager,
                                              string testUserPw, string UserName)
        {
            //var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            var user = await userManager.FindByNameAsync(UserName);
            if (user == null)
            {
                user = new ApplicationUser { UserName = UserName };
                await userManager.CreateAsync(user, testUserPw);
            }

            return user.Id;
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
