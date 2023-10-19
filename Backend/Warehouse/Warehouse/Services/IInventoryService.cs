using Warehouse.Models.DTO;
using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IInventoryService
{
    Task<Inventory> GetInventory(long inventoryId);
    
    Task<List<Inventory>> GetAllInventories();
    
    Task AddInventory(InventoryDTO inventory);
    
    Task UpdateInventory(Inventory inventory, long id);
    
    Task DeleteInventory(long id);
    Task<List<Location>> GetUsedLocations();
    Task<List<Location>> GetUnusedLocations();
}