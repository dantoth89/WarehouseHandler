using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;

namespace Warehouse.Services;

public class SupplierService : ISupplierService
{
    private readonly WarehouseContext _warehouseContext;

    public SupplierService(WarehouseContext warehouseContext)
    {
        _warehouseContext = warehouseContext;
    }

    private void CheckSupplier(Supplier supplier)
    {
        if (supplier == null)
            throw new ArgumentException($"Supplier does not exist");
    }
    
    public async Task<Supplier> GetSupplier(long supplierId)
    {
        var supplier = _warehouseContext.Suppliers.FirstOrDefault(s => s.Id == supplierId);

        CheckSupplier(supplier);

        return supplier;
    }

    public async Task<List<Supplier>> GetAllSuppliers()
    {
        var suppliers = _warehouseContext.Suppliers.ToList();
        
        return suppliers;
    }

    public async Task AddSupplier(Supplier supplier)
    {
        _warehouseContext.Suppliers.Add(supplier);
        await _warehouseContext.SaveChangesAsync();
    }

    public async Task UpdateSupplier(Supplier supplier, long id)
    {
        var supplierToUpdate = await _warehouseContext.Suppliers.FirstOrDefaultAsync(s => s.Id == id);

        CheckSupplier(supplierToUpdate);

        supplierToUpdate.Name = supplier.Name;
        supplierToUpdate.Description = supplier.Description;
        supplierToUpdate.ContactPhone = supplier.ContactPhone;
        supplierToUpdate.ContactEmail = supplier.ContactEmail;

        await _warehouseContext.SaveChangesAsync();
    }

    public async Task DeleteSupplier(long id)
    {
        var supplierToDelete = await _warehouseContext.Suppliers.FirstOrDefaultAsync(s => s.Id == id);

        CheckSupplier(supplierToDelete);

        _warehouseContext.Suppliers.Remove(supplierToDelete);

        await _warehouseContext.SaveChangesAsync();
    }
}