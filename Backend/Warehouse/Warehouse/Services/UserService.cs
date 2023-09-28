using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;
using System.Security.Cryptography;
using System.Text;

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
        var user = _warehouseContext.Users.FirstOrDefault(u => u.Id == userId);

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
        var userToUpdate = await _warehouseContext.Users.FirstOrDefaultAsync(u => u.Id == id);

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
        var userToDelete = await _warehouseContext.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (userToDelete == null)
        {
            throw new ArgumentException($"User with Id {id} does not exist");
        }

        _warehouseContext.Users.Remove(userToDelete);

        await _warehouseContext.SaveChangesAsync();
    }

    // public static string HashPassword(string password, out string salt)
    // {
    //     using (var rng = new RNGCryptoServiceProvider())
    //     {
    //         byte[] saltBytes = new byte[16]; // Generate a 16-byte random salt
    //         rng.GetBytes(saltBytes);
    //
    //         salt = Convert.ToBase64String(saltBytes);
    //
    //         using (var sha256 = SHA256.Create())
    //         {
    //             byte[] saltedPasswordBytes = Encoding.UTF8.GetBytes(password + salt);
    //             byte[] hashedBytes = sha256.ComputeHash(saltedPasswordBytes);
    //             return Convert.ToBase64String(hashedBytes);
    //         }
    //     }
    // }
    //
    // public static bool VerifyPassword(string enteredPassword, string hashedPassword, string salt)
    // {
    //     using (var sha256 = SHA256.Create())
    //     {
    //         byte[] saltedEnteredPasswordBytes = Encoding.UTF8.GetBytes(enteredPassword + salt);
    //         byte[] hashedEnteredBytes = sha256.ComputeHash(saltedEnteredPasswordBytes);
    //         string hashedEnteredPassword = Convert.ToBase64String(hashedEnteredBytes);
    //         return string.Equals(hashedEnteredPassword, hashedPassword);
    //     }
    // }
    //
}