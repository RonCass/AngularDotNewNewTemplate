﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetNewTemplate.Utils
{
    //Class to return page metadata with api return response
    public class PagedList<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<T> ListItems { get; set; }

        public bool HasPrevious
        {
            get
            {
                return (CurrentPage > 1);
            }
        }

        public bool HasNext
        {
            get
            {
                return (CurrentPage < TotalPages);
            }
        }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            ListItems = items;
        }

        //Static Method that will call the contstructor above
        public static PagedList<T> Create(IQueryable<T> source, int pageNumber, int pageSize, string sort, string filterColumnName, string filterValue)
        {
            //Filter before sorting and getting the total count
            if (!string.IsNullOrEmpty(filterColumnName) && !string.IsNullOrEmpty(filterValue))
            {
                source = FilterDataUtil.FilterData(source, filterColumnName, filterValue);
            }

            var count = source.Count();
            var items = source
                .ApplySort(sort)
                .Skip((pageNumber) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedList<T>(items, count, pageNumber, pageSize);

        }

    }
}
