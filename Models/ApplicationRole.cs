using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    public class ApplicationRole: IdentityRole<int>
    {
        //9-12-2020 Ron C.: Adding in navigation properties - https://docs.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-3.1
        public virtual ICollection<ApplicationUserRole> ApplicationUserRoles { get; set; }

       
        //public virtual IdentityRole<int> Roles { get; } = new IdentityRole<int>();
    }
}
