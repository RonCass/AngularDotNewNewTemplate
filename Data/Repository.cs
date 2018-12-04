using System; 
using System.Collections.Generic; 
using System.Collections.ObjectModel; 
using System.Linq; 
using System.Linq.Expressions; 
using System.Threading.Tasks; 
//using Microsoft.AspNetCore.Razor.Chunks;
using AngularDotNetNewTemplate.Models;
using Microsoft.EntityFrameworkCore; 
using Microsoft.EntityFrameworkCore.ChangeTracking;
using AngularDotNetNewTemplate.Data;
using AngularDotNetNewTemplate.Utils;

namespace AngularDotNetNewTemplate.Data
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private ApplicationDbContext context = null;
        private DbSet<T> dbSet;
        const int maxPageSize = 100;

        public Repository(ApplicationDbContext contextPassed)
        {
            context = contextPassed;
            dbSet = context.Set<T>();
        }

        //public IQueryable<T> GetAll(Expression<Func<T, bool>> predicate = null)
        //{
        //    if (predicate != null)
        //    {
        //        return dbSet.Where(predicate);
        //    }
        //    return dbSet;
        //}

        public PagedList<T> GetAll(Expression<Func<T, bool>> predicate = null, int pageNumber = 1, int pageSize = 20, 
            string sort = null)
        {
            //Default Page Size checking
            pageSize = (pageSize > maxPageSize) ? maxPageSize : pageSize;

            if (predicate != null)
            {
                return PagedList<T>.Create(dbSet.Where(predicate), pageNumber, pageSize, sort);  
            }      

            return PagedList<T>.Create(dbSet, pageNumber, pageSize, sort);
        }

        //6-5-2018 Ron C.: Created this so I can add multiple includes
        /*
         * Example Usage In Method:
         * Create a list of strings
         *      List<string> myListOfIncludes = new List<string>();
         *  Then include the other properties:
         *      myListOfIncludes.Add("LineOfBusiness");
         *      myListOfIncludes.Add("LineOfBusiness2");
         *  Then call this method, passing in the list of items to include:
         *      myEntities = _repo.GetAllWithIncludes(myListOfIncludes, null, pageNumber, pageSize, sort);         * 
         */
        public PagedList<T> GetAllWithIncludes(List<string> properties,
           Expression<Func<T, bool>> predicate = null, int pageNumber = 1, int pageSize = 20,
            string sort = null)
        {
            IQueryable<T> myQueryable;

            if (predicate != null)
            {
                myQueryable = dbSet.AsQueryable().Where(predicate);
            }
            else
            {
                myQueryable = dbSet.AsQueryable();
            }

            foreach (var property in properties)
            {
                myQueryable = myQueryable.Include(property);
            }

            return PagedList<T>.Create(myQueryable, pageNumber, pageSize, sort);
        }

        public PagedList<T> GetAllEager(Expression<Func<T, object>> property,
            Expression<Func<T, bool>> predicate = null, int pageNumber = 1, int pageSize = 20,
            string sort = null)

        {
            //Default Page Size checking
            pageSize = (pageSize > maxPageSize) ? maxPageSize : pageSize;

            if (predicate != null)
            {
                //return dbSet.Include(property).Where(predicate);
                return PagedList<T>.Create(dbSet.Include(property).Where(predicate), pageNumber, pageSize, sort);
            }

            //return dbSet.Include(property);
            return PagedList<T>.Create(dbSet.Include(property), pageNumber, pageSize, sort);
            
        }

        //2-15-2018 Ron C.: Created this so I can add as the includes
        //public PagedList<T> GetAllWithIncludes(List<string> properties,
        //   Expression<Func<T, bool>> predicate = null, int pageNumber = 1, int pageSize = 20,
        //    string sort = null)
        //{
        //    IQueryable<T> myQueryable;

        //    if (predicate != null)
        //    {
        //        myQueryable = dbSet.AsQueryable().Where(predicate);
        //    }
        //    else
        //    {
        //        myQueryable = dbSet.AsQueryable();
        //    }

        //    foreach (var property in properties)
        //    {
        //        myQueryable = myQueryable.Include(property);
        //    }

        //    return PagedList<T>.Create(myQueryable, pageNumber, pageSize, sort);
        //}

        public ReferenceEntry<T, object> GetReference(T entity, Expression<Func<T, object>> property)
        {
            return context.Entry(entity)
                .Reference(property);
        }

        public T Get(Expression<Func<T, bool>> predicate)
        {
            return dbSet.FirstOrDefault(predicate);
        }

        //Get with Where and an Include
        public T GetEager(Expression<Func<T, object>> property, Expression<Func<T, bool>> predicate)
        {
            return dbSet.Include(property).FirstOrDefault(predicate);
        }

        //public void Add(T entity)
        //{
        //    dbSet.Add(entity);           
        //}

        public T Add(T entity)
        {
            dbSet.Add(entity);
            context.SaveChanges();
            return entity;
        }

        public void Update(T entity)
        {
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(T entity)
        {
            dbSet.Attach(entity); // in case the passed entity has not existed 
            dbSet.Remove(entity);
            context.SaveChanges();
        }

        public void DeleteById(int entityId)
        {
            var entity = dbSet.Find(entityId);
            if (entity != null)
            {
                dbSet.Remove(entity);
                context.SaveChanges();
            }
        }

    }

    public class Repository<T, T1> : IRepository<T, T1>
        where T1 : class
        where T : class
    {
        private ApplicationDbContext context = null;
        private DbSet<T> dbSet;

        public Repository(ApplicationDbContext contextPassed)
        {
            context = contextPassed;
            dbSet = context.Set<T>();
        }

        public IQueryable<T> GetAllEager(Expression<Func<T, ICollection<T1>>> joinProperty,
            Expression<Func<T1, object>> property, Expression<Func<T, bool>> predicate = null)
        {
            if (predicate != null)
            {
                return dbSet.Include(joinProperty)
                    .ThenInclude(property)
                    .Where(predicate);

            }

            return dbSet.Include(joinProperty)
                .ThenInclude(property);
        }

        public IQueryable<T> GetAllEagerAll(Expression<Func<T, object>> property,
            Expression<Func<T, ICollection<T1>>> joinProperty,
            Expression<Func<T1, object>> propertyOfJoin, Expression<Func<T, bool>> predicate = null)
        {
            if (predicate != null)
            {
                return dbSet.Include(property)
                    .Include(joinProperty)
                    .ThenInclude(propertyOfJoin)
                    .Where(predicate);
            }

            return dbSet.Include(property)
                .Include(joinProperty)
                .ThenInclude(propertyOfJoin);
        }

        public T GetEagerAll(Expression<Func<T, object>> property1, Expression<Func<T, object>> property2,
            Expression<Func<T, ICollection<T1>>> joinProperty,
            Expression<Func<T1, object>> propertyOfJoin, Expression<Func<T, bool>> predicate = null)
        {
            if (predicate != null)
            {
                return dbSet.Include(property1)
                    .Include(property2)
                    .Include(joinProperty)
                    .ThenInclude(propertyOfJoin)
                    .Where(predicate)
                    .FirstOrDefault();
            }

            return dbSet.Include(property1)
                    .Include(property2)
                    .Include(joinProperty)
                    .ThenInclude(propertyOfJoin)
                    .FirstOrDefault();
        }

        public CollectionEntry<T, T1> GetCollection(T entity, Expression<Func<T, IEnumerable<T1>>> property)
        {
            return context.Entry(entity)
                .Collection(property);
        }
    }
}