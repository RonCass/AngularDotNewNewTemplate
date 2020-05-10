using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    public class ApplicationUserRole : IdentityUserRole<int>
    {
        public ApplicationRole ApplicationRole { get; set; }
    }
}
