﻿using System;
using System.Collections.Generic;
using System.Linq;
//using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AngularDotNetNewTemplate.Models;
using Microsoft.AspNetCore.Identity;
using AngularDotNetNewTemplate.Models.EFTableTest;

namespace AngularDotNetNewTemplate.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
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

        public DbSet<Address> Address { get; set; }
        public DbSet<State> State { get; set; }
        public DbSet<Country> Country { get; set; }

        //EF Testing
        public DbSet<Application> Applications{ get; set; }
        public DbSet<PrimaryInfo> PrimaryInfos { get; set; }

    }
}
