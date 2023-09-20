using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface ISupplierService
{
    Task<Supplier> GetUser(long supplierId);
    
    Task<List<Supplier>> GetAllSuppliers();
    
    Task AddSupplier(Supplier supplier);
    
    Task UpdateSupplier(Supplier supplier, long id);
    
    Task DeleteSupplier(long id);
}