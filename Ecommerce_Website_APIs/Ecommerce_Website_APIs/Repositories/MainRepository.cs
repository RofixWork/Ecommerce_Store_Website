using Ecommerce_Website_APIs.Data;
using Ecommerce_Website_APIs.Repositories.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Ecommerce_Website_APIs.Repositories
{
    public class MainRepository<T> : IRepository<T> where T : class
    {
        private readonly ApiDbContext _db;

        public MainRepository(ApiDbContext db)
        {
            _db = db;
        }

        public async Task AddOne(T entity)
        {
            await _db.Set<T>().AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task CommitChanges()
        {
            await _db.SaveChangesAsync();
        }

        public async Task DeleteOne(T entity)
        {
            _db.Set<T>().Remove(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<object> Filter(int pageNumber, Expression<Func<T, bool>> expression, Expression<Func<T, DateTime>> orderBy, params string[] eagers)
        {
            IQueryable<T> items = _db.Set<T>();

            if(eagers.Any())
            {
                foreach (var eager in eagers)
                {
                    items = items.Include(eager);
                }
            }

            int pageSize = 4;
            var products = items.Where(expression);

            return new { products = await products.Skip((pageNumber - 1) * pageSize).Take(pageSize).OrderByDescending(orderBy).ToListAsync(), pageSize, pageNumber, count = products.Count() };
        }
        public async Task<T> FindOne(Expression<Func<T, bool>> expression, params string[] eagers)
        {
            IQueryable<T> item = _db.Set<T>();
            if (eagers.Any())
            {
                foreach (var eager in eagers)
                {
                    item = item.Include(eager);
                }
            }
            return await item.FirstOrDefaultAsync(expression);
        }

        public async Task<object> GetAll(int PageNumber, Expression<Func<T, DateTime>> expression, params string[] eagers)
        {
            IQueryable<T> items = _db.Set<T>();
            if (eagers.Any())
            {
                foreach (var eager in eagers)
                {
                    items = items.Include(eager);
                }
            }
            int pageSize = 4;
            int itemsCount = _db.Set<T>().ToList().Count;
            return new { items = await items.OrderByDescending(expression).Skip((PageNumber - 1) * pageSize).Take(pageSize).ToListAsync(), count = itemsCount, PageNumber, pageSize};
        }


        public async Task<IEnumerable<T>> GetAll()
        {
            return await _db.Set<T>().ToListAsync();
        }

        public async Task UpdateOne(T entity)
        {
            _db.Set<T>().Update(entity);
            await _db.SaveChangesAsync();
        }
    }
}
