using Warehouse.Models.DTO;
using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IUserService
{
    Task<User> GetUser(long userId);
    
    Task<User> GetUserByUsername(string name);

    Task<string> Login(string username, string password);
    
    Task<List<User>> GetAllUsers();
    
    Task AddUser(UserDto user);
    
    Task UpdateUser(User user, long id);
    
    Task DeleteUser(long id);
}