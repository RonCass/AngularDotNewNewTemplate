using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models.DTOIn
{
    public class ApplicationUserIn
    {
        //Fields From IdentityUser itself
        //public int Id { get; set; } //ID should be send to the Update Method outside of this model
        public int AccessFailCount { get; set; }
        public string Email { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
        public bool? TwoFactorEnabled { get; set; }
        public string UserName { get; set; }

        //Additional Fields that extend the Identity User
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateLastModified { get; set; }

        public string Password { get; set; }
        public string RoleName { get; set; }
    }
}
