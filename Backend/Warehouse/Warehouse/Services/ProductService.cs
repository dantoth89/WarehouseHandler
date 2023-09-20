using Warehouse.Models.Entities;
using Warehouse.Services;

namespace Warehouse.Services;

public class ProductService : IProductService
{
    public Task<Product> GetProduct(long productId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Product>> GetAllProducts()
    {
        throw new NotImplementedException();
    }

    public Task AddProduct(Product product)
    {
        throw new NotImplementedException();
    }

    public Task UpdateProduct(Product product, long id)
    {
        throw new NotImplementedException();
    }

    public Task DeleteProduct(long id)
    {
        throw new NotImplementedException();
    }
}