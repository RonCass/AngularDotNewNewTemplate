using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    public class LogGlobal
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Exception { get; set; }
        public string Level { get; set; }
        public string Logger { get; set; }
        public string Message { get; set; }
        public string Username { get; set; }
    }
}
