using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Models.DTOIn
{
    public class APICrudExampleIn
    {
        // The Id is sent in to Update or Delete directly. It doesn't use this field.
        //public int Id { get; set; }
        public string Field1 { get; set; }
        public string Field2 { get; set; }
    }
}
