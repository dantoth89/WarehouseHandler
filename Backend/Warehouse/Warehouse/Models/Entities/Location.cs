using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models.Entities;

public class Location
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int LocationId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Aisle { get; set; }

    [Required]
    [MaxLength(50)]
    public string Shelf { get; set; }

    [Required]
    [MaxLength(50)]
    public string Bin { get; set; }
}