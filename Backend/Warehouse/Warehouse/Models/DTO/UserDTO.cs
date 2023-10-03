using Warehouse.Models.Enums;

namespace Warehouse.Models.DTO;

public class UserDto
{
    public string Username { get; set; }

    public string Password { get; set; }

    public Role Role { get; set; }
}