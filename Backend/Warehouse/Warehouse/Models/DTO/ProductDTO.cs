namespace Warehouse.Models.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ProductDTO
{
    [MaxLength(255)]
    public string Name { get; set; }

    [MaxLength(50)]
    public string SKU { get; set; }

    [MaxLength(1000)]
    public string Description { get; set; }
    
    public int SupplierId { get; set; }
}
