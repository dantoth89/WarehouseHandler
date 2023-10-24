namespace Warehouse.Models.DTO;

public class OrderDTO
{
    public Dictionary<int, int> InventoriesToOrder { get; set; }

    public string Notes { get; set; }
}