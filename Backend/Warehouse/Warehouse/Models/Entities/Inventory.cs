using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models.Entities
{
    public class Inventory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        
        public Product Product { get; set; }
        
        [ForeignKey("Location")]
        public int LocationId { get; set; }
        public int Quantity { get; set; }
    }
}