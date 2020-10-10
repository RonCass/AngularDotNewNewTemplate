using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models.DTOOut
{
    public class ApplicationUserOut
    {
        public ApplicationUserOut()
        {
            //this.ApplicationRoles = new List<ApplicationRoleOut>();
        }

        //Fields From IdentityUser itself
        public int Id { get; set; }
        public int AccessFailCount { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public string UserName { get; set; }

        //Additional Fields that extend the Identity User
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateLastModified { get; set; }

        //public List<ApplicationRoleOut> ApplicationRoles { get; set; }
        public virtual ICollection<ApplicationUserRoleOut> ApplicationUserRoles { get; set; }

    }
}
