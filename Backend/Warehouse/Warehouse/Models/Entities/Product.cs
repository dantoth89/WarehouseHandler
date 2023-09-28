using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models.Entities;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [MaxLength(255)]
    public string Name { get; set; }

    [MaxLength(50)]
    public string SKU { get; set; }

    [MaxLength(1000)]
    public string Description { get; set; }
    
    public List<Supplier> Suppliers { get; set; }
}