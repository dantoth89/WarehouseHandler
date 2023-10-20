using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IOrderService
{
    public Task GenerateOrder(List<int> InventoryIds,string notes);

    public Task<List<Order>> GetOrders();
}