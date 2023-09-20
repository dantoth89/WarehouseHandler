using Warehouse.Models.Entities;

namespace Warehouse.Services;

public class InventoryService : IInventoryService
{
    public Task<Inventory> GetInventory(long inventoryId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Inventory>> GetAllInventorys()
    {
        throw new NotImplementedException();
    }

    public Task AddInventory(Inventory inventory)
    {
        throw new NotImplementedException();
    }

    public Task UpdateInventory(Inventory inventory, long id)
    {
        throw new NotImplementedException();
    }

    public Task DeleteInventory(long id)
    {
        throw new NotImplementedException();
    }
}