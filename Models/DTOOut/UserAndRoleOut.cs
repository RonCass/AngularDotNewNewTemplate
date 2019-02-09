using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models.DTOOut
{
    public class UserAndRoleOut
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
       
        public string Email { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
