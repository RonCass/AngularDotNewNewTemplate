using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    public class APICrudExample
    {
        [Key]
        public int Id { get; set; }
        public string Field1 { get; set; }
        public string Field2 { get; set; }
    }
}
