using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models.Entities;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public string OrderNotes { get; set; }
    
    public DateTime OrderDate { get; set; }
    
    public string OrderSummary { get; set; }
}