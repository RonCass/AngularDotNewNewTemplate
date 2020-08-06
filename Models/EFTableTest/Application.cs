using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models.EFTableTest
{
    public class Application
    {
        [Key]
        public Guid ApplicationId { get; set; }
        public Guid? ApplicationUserId { get; set; }
        public Guid StatusId { get; set; }
        public int Version { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateLastModified { get; set; }
        public DateTime? DateSubmitted { get; set; }
        public string ApplicationNumber { get; set; }
        public Guid? OriginalApplicationId { get; set; }


        


        public PrimaryInfo PrimaryInfo { get; set; }
    }
}
