using Ecommerce_Website_APIs.Entities;

namespace Ecommerce_Website_APIs.Repositories.Base
{
    public interface IUnitOfWork
    {
        IRepository<Category> Categories { get; }
        IRepository<Product> Products { get; }
        IRepository<Order> Orders { get; }
    }
}
