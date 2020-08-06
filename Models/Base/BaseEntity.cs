using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models.Base
{
    /// <summary>
    /// Base Class for models to 
    /// </summary>
    public abstract class BaseEntity
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        //Used for global filter to not keep but not show data on normal queries
        public bool IsDeleted { get; set; }
        //Used for Concurrency Checking
        [Timestamp]
        public byte[] TimeStamp { get; set; }
    }
}
