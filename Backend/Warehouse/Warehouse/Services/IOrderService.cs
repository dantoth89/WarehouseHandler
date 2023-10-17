namespace Warehouse.Services;

public interface IOrderService
{
    public Task GenerateOrder(List<int> InventoryIds);
}