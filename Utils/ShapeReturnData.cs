using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Utils
{
    public static class ShapeReturnData
    {
        //3-27-2017 Ron C.: Using this IEnumberableExtensions instead of this for generic calls in the API
        // 10-11-2016 Ron C.: Need a way to shape the object return from the API
        public static object CreateDataShapedObject<T>(T myObj, string lstOfFields)
        {
            if(lstOfFields == null)
            {
                return myObj;
            }

            if (!lstOfFields.Any())
            {
                return myObj;
            }
            else
            {
                // Parse the comma delimited string
                List<string> myListOfFields = new List<string>();
                if (lstOfFields != null)
                {
                    myListOfFields = lstOfFields.ToLower().Split(',').ToList();
                }

                // create a new ExpandoObject & dynamically create the properties for this object

                ExpandoObject objectToReturn = new ExpandoObject();
                foreach (var field in myListOfFields)
                {
                    // need to include public and instance, b/c specifying a binding flag overwrites the
                    // already-existing binding flags.

                    var fieldValue = myObj.GetType()
                        .GetProperty(field, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance)
                        .GetValue(myObj, null);

                    // add the field to the ExpandoObject
                    ((IDictionary<String, Object>)objectToReturn).Add(field, fieldValue);
                }

                return objectToReturn;
            }
        }
    }
}
