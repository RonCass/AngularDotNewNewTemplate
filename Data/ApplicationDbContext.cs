using System;
using System.Collections.Generic;
using System.Linq;
//using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AngularDotNetNewTemplate.Models;
using Microsoft.AspNetCore.Identity;
using AngularDotNetNewTemplate.Models.EFTableTest;
using System.Security.Cryptography.X509Certificates;

namespace AngularDotNetNewTemplate.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int, IdentityUserClaim<int>, ApplicationUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            // Uncomment this line if you want to ensure the database is created 
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // 8-6-2020 - Global Filters - Using to now show deleted data. Data is still saved in the database but does not show on normal queries. 
            // To Query without using filter = myDbContext.Address.IgnoreQueryFilters()
            builder.Entity<Address>().HasQueryFilter(x => !x.IsDeleted);

            //9-12-2020 Ron C.: Adding in navigation properties - https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-3.1
            builder.Entity<ApplicationUser>(b =>
            {
                // Each User can have many UserClaims
                //b.HasMany(e => e.Claims)
                //    .WithOne()
                //    .HasForeignKey(uc => uc.UserId)
                //    .IsRequired();

                //// Each User can have many UserLogins
                //b.HasMany(e => e.Logins)
                //    .WithOne()
                //    .HasForeignKey(ul => ul.UserId)
                //    .IsRequired();

                //// Each User can have many UserTokens
                //b.HasMany(e => e.Tokens)
                //    .WithOne()
                //    .HasForeignKey(ut => ut.UserId)
                //    .IsRequired();

                // Each User can have many entries in the UserRole join table
                b.HasMany(e => e.ApplicationUserRoles)
                    .WithOne(e => e.ApplicationUser)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });            

            builder.Entity<ApplicationRole>(b =>
            {
                // Each Role can have many entries in the UserRole join table
                b.HasMany(e => e.ApplicationUserRoles)
                    .WithOne(e => e.ApplicationRole)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
            });

            //Rename the tables
            builder.Entity<ApplicationUser>(b =>
            {
                b.ToTable("ApplicationUsers");
            });

            builder.Entity<IdentityUserClaim<int>>(b =>
            {
                b.ToTable("ApplicationUserClaims");
            });

            builder.Entity<IdentityUserLogin<int>>(b =>
            {
                b.ToTable("ApplicationUserLogins");
            });

            builder.Entity<IdentityUserToken<int>>(b =>
            {
                b.ToTable("ApplicationUserTokens");
            });

            builder.Entity<ApplicationRole>(b =>
            {
                b.ToTable("ApplicationRoles");
            });

            builder.Entity<IdentityRoleClaim<int>>(b =>
            {
                b.ToTable("ApplicationRoleClaims");
            });

            builder.Entity<ApplicationUserRole>(b =>
            {
                b.ToTable("ApplicationUserRoles");
            });




            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);          

            //3-27-2018 Ron C.: Adding in all the navigation properties that were removed from the default implementation with aspnetcore 2.0
            //builder.Entity<ApplicationUser>()
            //   .HasMany(e => e.Claims)
            //   .WithOne()
            //   .HasForeignKey(e => e.UserId)
            //   .IsRequired()
            //   .OnDelete(DeleteBehavior.Cascade);

            //builder.Entity<ApplicationUser>()
            //    .HasMany(e => e.Logins)
            //    .WithOne()
            //    .HasForeignKey(e => e.UserId)
            //    .IsRequired()
            //    .OnDelete(DeleteBehavior.Cascade);

            //builder.Entity<ApplicationUser>()
            //    .HasMany(e => e.UserRoles)
            //    .WithOne()
            //    .HasForeignKey(e => e.UserId)
            //    .IsRequired()
            //    .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<PrimaryInfo>()
                .HasIndex(x => x.ApplicationId)
                .IsUnique(false);
                
        }


        //Extends the IdentityUser
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<ApplicationUserRole> ApplicationUserRole { get; set; }
        public DbSet<ApplicationRole> ApplicationRole { get; set; }

        public DbSet<APICrudExample> APICrudExample { get; set; }
        public DbSet<DummyData> DummyData { get; set; }
        //Used for Serilog logging to the database
        public DbSet<Log> Log { get; set; }
        public DbSet<LogGlobal> LogGlobals { get; set; }

        public DbSet<Address> Address { get; set; }
        public DbSet<State> State { get; set; }
        public DbSet<Country> Country { get; set; }

        //EF Testing
        public DbSet<Application> Applications{ get; set; }
        public DbSet<PrimaryInfo> PrimaryInfos { get; set; }

    }
}
