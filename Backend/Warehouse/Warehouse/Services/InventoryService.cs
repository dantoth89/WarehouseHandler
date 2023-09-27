using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;

namespace Warehouse.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly WarehouseContext _warehouseContext;

        public InventoryService(WarehouseContext warehouseContext)
        {
            _warehouseContext = warehouseContext;
        }

        public async Task<Inventory> GetInventory(long inventoryId)
        {
            var inventory = await _warehouseContext.Inventories
                .Include(i => i.Product)
                .FirstOrDefaultAsync(i => i.InventoryId == inventoryId);

            if (inventory == null)
            {
                throw new ArgumentException($"Inventory with Id {inventoryId} does not exist");
            }

            return inventory;
        }

        public async Task<List<Inventory>> GetAllInventories()
        {
            var inventories = await _warehouseContext.Inventories
                .Include(i => i.Product) 
                .ToListAsync();

            return inventories;
        }

        public async Task AddInventory(Inventory inventory)
        {
            _warehouseContext.Inventories.Add(inventory);
            await _warehouseContext.SaveChangesAsync();
        }

        public async Task UpdateInventory(Inventory updatedInventory, long id)
        {
            var inventoryToUpdate = await _warehouseContext.Inventories
                .FirstOrDefaultAsync(i => i.InventoryId == id);

            if (inventoryToUpdate == null)
            {
                throw new ArgumentException($"Inventory with Id {id} does not exist");
            }

            inventoryToUpdate.ProductId = updatedInventory.ProductId;
            inventoryToUpdate.LocationId = updatedInventory.LocationId;
            inventoryToUpdate.Quantity = updatedInventory.Quantity;
            inventoryToUpdate.BatchNumber = updatedInventory.BatchNumber;

            await _warehouseContext.SaveChangesAsync();
        }

        public async Task DeleteInventory(long id)
        {
            var inventoryToDelete = await _warehouseContext.Inventories
                .FirstOrDefaultAsync(i => i.InventoryId == id);

            if (inventoryToDelete == null)
            {
                throw new ArgumentException($"Inventory with Id {id} does not exist");
            }

            _warehouseContext.Inventories.Remove(inventoryToDelete);
            await _warehouseContext.SaveChangesAsync();
        }
    }
}
