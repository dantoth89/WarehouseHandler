using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models.Entities;

public class Inventory
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int InventoryId { get; set; }

    [Required]
    [ForeignKey("ProductId")]
    public int ProductId { get; set; }
    
    public Product Product { get; set; }

    [Required]
    [MaxLength(50)]
    public string Location { get; set; }

    [Required]
    public int Quantity { get; set; }

    [MaxLength(50)]
    public string BatchNumber { get; set; }

}