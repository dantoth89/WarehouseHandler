using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IProductService
{
    Task<Product> GetProduct(long productId);
    
    Task<List<Product>> GetAllProducts();
    
    Task AddProduct(Product product);
    
    Task UpdateProduct(Product product, long id);
    
    Task DeleteProduct(long id);
}