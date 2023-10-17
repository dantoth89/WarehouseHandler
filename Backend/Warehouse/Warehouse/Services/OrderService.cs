﻿using System.Text;
using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;
using Warehouse.Services;

public class OrderService : IOrderService
{
    private readonly WarehouseContext _warehouseContext;
    private readonly ILogService _logService;

    public OrderService(WarehouseContext warehouseContext, ILogService logService)
    {
        _warehouseContext = warehouseContext;
        _logService = logService;
    }
    
    public async Task GenerateOrder(List<int> inventoryIds)
    {
        List<Inventory> inventoriesForOrder = new List<Inventory>();

        foreach (var inventoryId in inventoryIds)
        {
            var inventory = await _warehouseContext.Inventories.FirstOrDefaultAsync(x => x.Id == inventoryId);
            if (inventory != null)
            {
                inventoriesForOrder.Add(inventory);
            }
        }

        StringBuilder logMessage = new StringBuilder();
        logMessage.AppendLine("Selected Inventory Items for Order:");
        
        foreach (var inventory in inventoriesForOrder)
        {
            var locationCode = await _warehouseContext.Locations.FirstOrDefaultAsync(l => l.Id == inventory.LocationId);
            logMessage.AppendLine($"ID: {inventory.Id}");
            logMessage.AppendLine($"Location: {locationCode.LocationCode}");
            logMessage.AppendLine($"Quantity: {inventory.Quantity}");
            logMessage.AppendLine("------------------------------");
        }

        _logService.MakeLog(logMessage.ToString());
    }
}