using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace AngularDotNetNewTemplate.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser<int>
    {
       //Additional Fields that extend the Identity User
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateLastModified { get; set; }

        public List<ApplicationUserRole> ApplicationUserRoles { get; set; }

        //3-27-2018 Ron C.: Adding in all the navigation properties that were removed from the default implementation with aspnetcore 2.0
        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        //public virtual ICollection<IdentityUserRole<int>> UserRoles { get; } = new List<IdentityUserRole<int>>();
        //public virtual ICollection<ApplicationUserRole> ApplicationUserRoles { get; } = new List<ApplicationUserRole>();

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
       // public virtual ICollection<IdentityUserClaim<int>> Claims { get; } = new List<IdentityUserClaim<int>>();

        /// <summary>
        /// Navigation property for this users login accounts.
        /// </summary>
        //public virtual ICollection<IdentityUserLogin<int>> Logins { get; } = new List<IdentityUserLogin<int>>();
    }
}
