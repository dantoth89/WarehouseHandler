using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models.Entities;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProductId { get; set; }

    [Required]
    [MaxLength(255)]
    public string Name { get; set; }

    [Required]
    [MaxLength(50)]
    public string SKU { get; set; }

    [MaxLength(1000)]
    public string Description { get; set; }

    public int SupplierId { get; set; }
    
    [ForeignKey("SupplierId")]
    public Supplier Supplier { get; set; }

    public ICollection<Inventory> Inventories { get; set; }
}