﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    public class CredentialModel
    {

        [Required]
        public string UserName { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}
