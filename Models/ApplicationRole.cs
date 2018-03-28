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

        //public virtual IdentityRole<int> Roles { get; } = new IdentityRole<int>();
    }
}
