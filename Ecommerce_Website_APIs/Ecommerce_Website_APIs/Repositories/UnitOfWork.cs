using Ecommerce_Website_APIs.Data;
using Ecommerce_Website_APIs.Entities;
using Ecommerce_Website_APIs.Repositories.Base;

namespace Ecommerce_Website_APIs.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApiDbContext _context;
        public IRepository<Category> Categories { get; private set; }

        public IRepository<Product> Products { get; private set; }

        public IRepository<Order> Orders { get; private set; }

        public UnitOfWork(ApiDbContext context)
        {
            Categories = new MainRepository<Category>(context);
            Products = new MainRepository<Product>(context);
            Orders = new MainRepository<Order>(context);
            _context = context;
        }
    }
}
