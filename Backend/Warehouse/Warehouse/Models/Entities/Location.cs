using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models.Entities;

public class Location
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [MaxLength(50)]
    public string Aisle { get; set; }

    [MaxLength(50)]
    public string Shelf { get; set; }

    [MaxLength(50)]
    public string Bin { get; set; }
}