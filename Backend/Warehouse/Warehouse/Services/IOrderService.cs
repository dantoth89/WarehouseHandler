using Warehouse.Models.DTO;
using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IOrderService
{
    public Task GenerateOrder(OrderDTO orderDto);

    public Task<List<Order>> GetOrders();
}