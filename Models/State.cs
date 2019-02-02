using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    // States are loaded in to the State Table in Data > ApplicationUserSeedData.cs
    public class State
    {
        [Key]
        public int Id { get; set; }
        public string Abbreviation { get; set; }
        public string Name { get; set; }
    }
}
