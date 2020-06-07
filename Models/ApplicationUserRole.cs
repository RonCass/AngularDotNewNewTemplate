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
        public override int UserId { get; set; }
        public override int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public ApplicationRole ApplicationRole { get; set; }
    }
}
