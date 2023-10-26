using System.Text;
using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.DTO;
using Warehouse.Models.Entities;
using Warehouse.Services;

public class OrderService : IOrderService
{
    private readonly WarehouseContext _warehouseContext;
    private readonly ILogService _logService;
    private IOrderService _orderServiceImplementation;

    public OrderService(WarehouseContext warehouseContext, ILogService logService)
    {
        _warehouseContext = warehouseContext;
        _logService = logService;
    }
    
    public async Task GenerateOrder(OrderDTO orderDto)
    {
        List<Inventory> inventoriesForOrder = new List<Inventory>();

        foreach (var (inventoryId, amount) in orderDto.InventoriesToOrder)
        {
            var inventory = await _warehouseContext.Inventories.FirstOrDefaultAsync(x => x.Id == inventoryId);
            if (inventory != null && inventory.Quantity >= amount)
            {
                inventory.Quantity -= amount;
                inventoriesForOrder.Add(inventory);
            }

            if (inventory.Quantity == 0)
            {
                _warehouseContext.Inventories.Remove(inventory);
            }
        }

        if (inventoriesForOrder.Count == 0)
        {
            throw new Exception("No inventories for the order.");
        }

        var logMessage = new StringBuilder();
        logMessage.AppendLine("Selected Inventory Items for Order:");

        foreach (var inventory in inventoriesForOrder)
        {
            var locationCode = await _warehouseContext.Locations.FirstOrDefaultAsync(l => l.Id == inventory.LocationId);
            logMessage.AppendLine($"ID: {inventory.Id}");
            logMessage.AppendLine($"Location: {locationCode.LocationCode}");
            logMessage.AppendLine($"Quantity Ordered: {orderDto.InventoriesToOrder[inventory.Id]}");
            logMessage.AppendLine("------------------------------");
        }

        var order = new Order
        {
            OrderDate = DateTime.Now,
            OrderNotes = orderDto.Notes,
            OrderSummary = logMessage.ToString()
        };

        _warehouseContext.Orders.Add(order);
        await _warehouseContext.SaveChangesAsync();
        _logService.MakeLog(logMessage.ToString());
    }


    public async Task<List<Order>> GetOrders()
    {
        var orders = await _warehouseContext.Orders.ToListAsync();
        return orders;
    }
    
    public async Task<Order> GetOrder(long orderId)
    {
        var order = await _warehouseContext.Orders
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
        {
            throw new ArgumentException($"Order with Id {orderId} does not exist");
        }

        return order;
    }
}