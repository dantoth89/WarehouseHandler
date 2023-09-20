using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface IUserService
{
    Task<User> GetUser(long userId);
    
    Task<List<User>> GetAllUsers();
    
    Task AddUser(User user);
    
    Task UpdateUser(User user, long id);
    
    Task DeleteUser(long id);
}