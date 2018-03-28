﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models
{
    public class Log
    {
        [Key]
        public int Id { get; set; }
        public string Message { get; set; }
        public string MessageTemplate { get; set; }
        public string Level { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Exception { get; set; }

        //public string Properties { get; set; }
        public string LogEvent { get; set; }

        public string UserId { get; set; }
        public string RequestPath { get; set; }
        public string SourceContext { get; set; }
        public string ActionId { get; set; }
        public string ActionName { get; set; }
        public string RequestId { get; set; }
    }
}
