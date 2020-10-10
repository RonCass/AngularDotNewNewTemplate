using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    public class ApplicationUserRole : IdentityUserRole<int>
    {

        //9-12-2020 Ron C.: Adding in navigation properties - https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-3.1
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual ApplicationRole ApplicationRole { get; set; }


        // public virtual ICollection<ApplicationRoleClaim> RoleClaims { get; set; }
        //public override int UserId { get; set; }
        //public override int RoleId { get; set; }

        //[ForeignKey("RoleId")]
        //public ApplicationRole ApplicationRole { get; set; }
    }
}
