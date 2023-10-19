using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.DTO;
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
                .FirstOrDefaultAsync(i => i.Id == inventoryId);
            inventory.Product = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.Id == inventory.ProductId);
            inventory.Product.Supplier =
                await _warehouseContext.Suppliers.FirstOrDefaultAsync(s => s.Id == inventory.Product.SupplierId);

            if (inventory == null)
            {
                throw new ArgumentException($"Inventory with Id {inventoryId} does not exist");
            }

            return inventory;
        }

        public async Task<List<Inventory>> GetAllInventories()
        {
            var inventories = await _warehouseContext.Inventories
                .ToListAsync();
            foreach (var i in inventories)
            {
                i.Product = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.Id == i.ProductId);
                i.Product.Supplier =
                    await _warehouseContext.Suppliers.FirstOrDefaultAsync(s => s.Id == i.Product.SupplierId);
            }
            
            return inventories;
        }

        public async Task AddInventory(InventoryDTO inventory)
        {
            var newInventory = new Inventory
            {
                Quantity = inventory.Quantity,
                ProductId = inventory.ProductId,
                Product = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.Id == inventory.ProductId),
                LocationId = inventory.LocationId,
            };
            
            _warehouseContext.Inventories.Add(newInventory);
            await _warehouseContext.SaveChangesAsync();
        }

        public async Task UpdateInventory(InventoryDTO updatedInventory, long id)
        {
            var inventoryToUpdate = await _warehouseContext.Inventories.FirstOrDefaultAsync(i => i.Id == id);

            if (inventoryToUpdate == null)
            {
                throw new ArgumentException($"Inventory with Id {id} does not exist");
            }

            inventoryToUpdate.LocationId = updatedInventory.LocationId;
            inventoryToUpdate.Quantity = updatedInventory.Quantity;

            await _warehouseContext.SaveChangesAsync();
        }

        public async Task DeleteInventory(long id)
        {
            var inventoryToDelete = await _warehouseContext.Inventories
                .FirstOrDefaultAsync(i => i.Id == id);

            if (inventoryToDelete == null)
            {
                throw new ArgumentException($"Inventory with Id {id} does not exist");
            }

            _warehouseContext.Inventories.Remove(inventoryToDelete);
            await _warehouseContext.SaveChangesAsync();
        }

        public async Task<List<Location>> GetUsedLocations()
        {
            var locationIds = await _warehouseContext.Inventories
                .Select(i => i.LocationId)
                .Distinct()
                .ToListAsync();

            var usedLocations = await _warehouseContext.Locations
                .Where(l => locationIds.Contains(l.Id))
                .ToListAsync();

            return usedLocations;
        }
        
        public async Task<List<Location>> GetUnusedLocations()
        {
            var usedLocationIds = await _warehouseContext.Inventories
                .Select(i => i.LocationId)
                .Distinct()
                .ToListAsync();

            var unusedLocations = await _warehouseContext.Locations
                .Where(l => !usedLocationIds.Contains(l.Id))
                .ToListAsync();

            return unusedLocations;
        }

    }
}
