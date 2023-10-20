using Warehouse.Data;
using Warehouse.Models.Entities;

namespace Warehouse.Services;

public class TestDbService : ITestDbService
{
    private readonly WarehouseContext _warehouseContext;

    public TestDbService(WarehouseContext warehouseContext)
    {
        _warehouseContext = warehouseContext;
    }

    public async Task CreateTestData()
    {
        _warehouseContext.Locations.AddRange(
            new Location { LocationCode = "Location1", Notes = "Sample location 1" },
            new Location { LocationCode = "Location2", Notes = "Sample location 2" },
            new Location { LocationCode = "Location3", Notes = "Sample location 3" }
        );
        
        await _warehouseContext.SaveChangesAsync();

        _warehouseContext.Suppliers.AddRange(
            new Supplier
            {
                Name = "Supplier1", Description = "Sample supplier 1", ContactEmail = "supplier1@example.com",
                ContactPhone = "1234567890"
            },
            new Supplier
            {
                Name = "Supplier2", Description = "Sample supplier 2", ContactEmail = "supplier2@example.com",
                ContactPhone = "9876543210"
            }
        );
        
        await _warehouseContext.SaveChangesAsync();

        var supplier1 = _warehouseContext.Suppliers.First();
        
        _warehouseContext.Products.AddRange(
            new Product
            {
                Name = "Product1", SKU = "SKU001", Description = "Sample product 1", SupplierId = supplier1.Id
            },
            new Product
            {
                Name = "Product2", SKU = "SKU002", Description = "Sample product 2", SupplierId = supplier1.Id
            }
        );
        
        await _warehouseContext.SaveChangesAsync();

        var product1 = _warehouseContext.Products.First();
        var location1 = _warehouseContext.Locations.First();
        
        _warehouseContext.Inventories.AddRange(
            new Inventory { ProductId = product1.Id, LocationId = location1.Id, Quantity = 10 },
            new Inventory { ProductId = product1.Id, LocationId = location1.Id, Quantity = 5 }
        );

        await _warehouseContext.SaveChangesAsync();
    }

    public async Task CleanDB()
    {
        _warehouseContext.Set<Location>().RemoveRange(_warehouseContext.Set<Location>());
        _warehouseContext.Set<Order>().RemoveRange(_warehouseContext.Set<Order>());
        _warehouseContext.Set<Supplier>().RemoveRange(_warehouseContext.Set<Supplier>());
        _warehouseContext.Set<Product>().RemoveRange(_warehouseContext.Set<Product>());
        _warehouseContext.Set<Inventory>().RemoveRange(_warehouseContext.Set<Inventory>());

        await _warehouseContext.SaveChangesAsync();
    }
}