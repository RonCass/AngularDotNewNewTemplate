using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models.EFTableTest
{
    public class PrimaryInfo
    {
        [Key]
        public Guid PrimaryInfoId { get; set; }
        public Guid ApplicationId { get; set; }
        public Guid? TemplateId { get; set; }

        public Guid? ApplicationTypeId { get; set; }
        public Guid? SiteId { get; set; } //From Floyd per Rabasa
        public string SiteNumber { get; set; } //Used so I dont have to do a lookup in Quasar when I need to display
        public string ApplicationName { get; set; }
        public Guid? LeaseTypeId { get; set; }
        public string Description { get; set; }
        //public bool? IsDefaultTemplate { get; set; }


        [ForeignKey("ApplicationId")]
        public Application Application { get; set; }
    }
}
