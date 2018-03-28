using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace AngularDotNetNewTemplate.Utils
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplySort<T>(this IQueryable<T> source, string sort)
        {
            if (source == null)
            {
                throw new ArgumentNullException("source");
            }

            if (sort == null)
            {
                return source;
            }

            // split the sort string
            var lstSort = sort.Split(',');

            // run through the sorting options and apply them - in reverse
            // order, otherwise results will come out sorted by the last 
            // item in the string first!
            string completeSortExpression = "";
            foreach (var sortOption in lstSort)
            {
                // if the sort option starts with "-", we order
                // descending, otherwise ascending

                if (sortOption.StartsWith("-"))
                {
                    completeSortExpression = completeSortExpression + sortOption.Remove(0, 1) + " descending,";
                }
                else
                {
                    completeSortExpression = completeSortExpression + sortOption + ",";
                }

            }

            if (!string.IsNullOrWhiteSpace(completeSortExpression))
            {
                source = source.OrderBy(completeSortExpression.Remove(completeSortExpression.Count() - 1));
            }

            return source;
        }

        //public static IQueryable ApplySort(this IQueryable source, string sort)
        //{
        //    if (source == null)
        //    {
        //        throw new ArgumentNullException("source");
        //    }

        //    if (sort == null)
        //    {
        //        return source;
        //    }

        //    // split the sort string
        //    var lstSort = sort.Split(',');

        //    // run through the sorting options and apply them - in reverse
        //    // order, otherwise results will come out sorted by the last 
        //    // item in the string first!
        //    string completeSortExpression = "";
        //    foreach (var sortOption in lstSort)
        //    {
        //        // if the sort option starts with "-", we order
        //        // descending, otherwise ascending

        //        if (sortOption.StartsWith("-"))
        //        {
        //            completeSortExpression = completeSortExpression + sortOption.Remove(0, 1) + " descending,";
        //        }
        //        else
        //        {
        //            completeSortExpression = completeSortExpression + sortOption + ",";
        //        }

        //    }

        //    if (!string.IsNullOrWhiteSpace(completeSortExpression))
        //    {
        //        source = source.OrderBy(completeSortExpression.Remove(completeSortExpression.Count() - 1));
        //    }

        //    return source;
        //}
    }
}
