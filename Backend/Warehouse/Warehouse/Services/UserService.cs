using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;

namespace Warehouse.Services;

public class UserService : IUserService
{
    private readonly WarehouseContext _warehouseContext;

    public UserService(WarehouseContext warehouseContext)
    {
        _warehouseContext = warehouseContext;
    }
    
    public async Task<User> GetUser(long userId)
    {
        var user = _warehouseContext.Users.FirstOrDefault(u => u.UserId == userId);

        if (user == null)
        {
            throw new ArgumentException($"User with Id {userId} does not exist");
        }

        return user;    
    }

    public async Task<List<User>> GetAllUsers()
    {
        var users = _warehouseContext.Users.ToList();
        return users;
    }
    
    public async Task AddUser(User user)
    {
        var userToAdd = new User 
        {
            Username = user.Username,
            Password = user.Password,
            Role = user.Role
        };
        _warehouseContext.Users.Add(userToAdd);
        await _warehouseContext.SaveChangesAsync();
    }

    public async Task UpdateUser(User updatedUser, long id)
    {
        var userToUpdate = await _warehouseContext.Users.FirstOrDefaultAsync(u => u.UserId == id);

        if (userToUpdate == null)
        {
            throw new ArgumentException($"User with Id {id} does not exist");
        }

        userToUpdate.Username = updatedUser.Username;
        userToUpdate.Password = updatedUser.Password;
        userToUpdate.Role = updatedUser.Role;

        await _warehouseContext.SaveChangesAsync();
        
    }

    public async Task DeleteUser(long id)
    {
        var userToDelete = await _warehouseContext.Users.FirstOrDefaultAsync(u => u.UserId == id);

        if (userToDelete == null)
        {
            throw new ArgumentException($"User with Id {id} does not exist");
        }

        _warehouseContext.Users.Remove(userToDelete);

        await _warehouseContext.SaveChangesAsync();
        
    }
}