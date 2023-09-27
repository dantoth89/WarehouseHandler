using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Warehouse.Models.Enums;

namespace Warehouse.Models.Entities;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

    [Required]
    [MaxLength(255)]
    public string Username { get; set; }
    
    [Required]
    public string Password { get; set; }
    
    [Required]
    public Role Role { get; set; }
}