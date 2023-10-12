using Warehouse.Models.DTO;
using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IProductService
{
    Task<Product> GetProduct(long productId);
    
    Task<List<Product>> GetAllProducts();
    
    Task AddProduct(ProductDTO product);
    
    Task UpdateProduct(ProductDTO product, long id);
    
    Task DeleteProduct(long id);
}