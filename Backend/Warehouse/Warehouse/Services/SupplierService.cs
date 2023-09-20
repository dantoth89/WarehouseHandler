using Warehouse.Models.Entities;

namespace Warehouse.Services;

public class SupplierService : ISupplierService
{
    public Task<Supplier> GetUser(long supplierId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Supplier>> GetAllSuppliers()
    {
        throw new NotImplementedException();
    }

    public Task AddSupplier(Supplier supplier)
    {
        throw new NotImplementedException();
    }

    public Task UpdateSupplier(Supplier supplier, long id)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSupplier(long id)
    {
        throw new NotImplementedException();
    }
}