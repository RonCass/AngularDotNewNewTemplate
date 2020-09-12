using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Utils
{
    public static class FilterDataUtil
    {

        public static IQueryable<T> FilterData<T>(IQueryable<T> data, string filterColumnName = "", string filterValue = "")
        {

            if (!string.IsNullOrEmpty(filterColumnName) && !string.IsNullOrEmpty(filterValue))
            {
                try
                {
                    var parameterExp = Expression.Parameter(typeof(T), "type");
                    var propertyExp = Expression.Property(parameterExp, filterColumnName);
                    MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                    var someValue = Expression.Constant(filterValue, typeof(string));
                    var containsMethodExp = Expression.Call(propertyExp, method, someValue);

                    MethodCallExpression whereCallExpression = Expression.Call(
                        typeof(Queryable),
                        "Where",
                        new Type[] { data.ElementType },
                        data.Expression,
                        Expression.Lambda<Func<T, bool>>(containsMethodExp, parameterExp));

                    data = data.Provider.CreateQuery<T>(whereCallExpression);

                    return data;

                }
                catch (Exception ex)
                {
                    // swallow error. If we errored out it simply means that it's a field we cannot search into (like a GUID)
                }

            }

            return data;
        }


    }
}
