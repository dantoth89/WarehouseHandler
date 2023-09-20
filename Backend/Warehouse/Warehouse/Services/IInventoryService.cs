using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IInventoryService
{
    Task<Inventory> GetInventory(long inventoryId);
    
    Task<List<Inventory>> GetAllInventorys();
    
    Task AddInventory(Inventory inventory);
    
    Task UpdateInventory(Inventory inventory, long id);
    
    Task DeleteInventory(long id);
}