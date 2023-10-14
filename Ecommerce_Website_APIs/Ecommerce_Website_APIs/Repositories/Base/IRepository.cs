using System.Linq.Expressions;

namespace Ecommerce_Website_APIs.Repositories.Base
{
    public interface IRepository<T> where T : class
    {
        Task<object> GetAll(int pageNumber, Expression<Func<T, DateTime>> expression, params string[] eagers);
        Task<IEnumerable<T>> GetAll();
        Task AddOne(T entity);

        Task<T> FindOne(Expression<Func<T, bool>> expression, params string[] eagers);

        Task UpdateOne(T entity);

        Task DeleteOne(T entity);
        Task CommitChanges();
        Task<object> Filter(int pageNumber,Expression<Func<T, bool>> expression,Expression<Func<T, DateTime>> orderBy, params string[] eagers);
    }
}
