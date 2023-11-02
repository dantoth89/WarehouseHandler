using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;
using System.Security.Cryptography;
using System.Text;
using Warehouse.Models.DTO;

namespace Warehouse.Services;

public class UserService : IUserService
{
    private readonly WarehouseContext _warehouseContext;
    private readonly Random rnd = new Random();

    public UserService(WarehouseContext warehouseContext)
    {
        _warehouseContext = warehouseContext;
    }

    private void CheckUser(User user)
    {
        if (user == null)
            throw new ArgumentException($"User does not exist");
    }

    public async Task<User> GetUser(long userId)
    {
        var user = _warehouseContext.Users.FirstOrDefault(u => u.Id == userId);
        CheckUser(user);
        return user;
    }

    public async Task<User> GetUserByUsername(string name)
    {
        var user = _warehouseContext.Users.FirstOrDefault(u => u.Username == name);
        CheckUser(user);
        return user;
    }

    public async Task<List<User>> GetAllUsers()
    {
        var users = _warehouseContext.Users.ToList();
        return users;
    }

    public async Task AddUser(UserDto user)
    {
        byte[] salt = GenerateSalt();

        string hashedPassword = Hash(user.Password, salt);

        var userToAdd = new User
        {
            Username = user.Username,
            Password = hashedPassword,
            Salt = salt,
            Role = user.Role
        };

        _warehouseContext.Users.Add(userToAdd);
        await _warehouseContext.SaveChangesAsync();
    }

    public async Task UpdateUser(UserDto updatedUser, long id)
    {
        var userToUpdate = await _warehouseContext.Users.FirstOrDefaultAsync(u => u.Id == id);

        CheckUser(userToUpdate);

        userToUpdate.Username = updatedUser.Username;
        userToUpdate.Password = Hash(updatedUser.Password, userToUpdate.Salt);
        userToUpdate.Role = updatedUser.Role;

        await _warehouseContext.SaveChangesAsync();
    }

    public async Task DeleteUser(long id)
    {
        var userToDelete = await _warehouseContext.Users.FirstOrDefaultAsync(u => u.Id == id);

        CheckUser(userToDelete);
        
        _warehouseContext.Users.Remove(userToDelete);

        await _warehouseContext.SaveChangesAsync();
    }

    public byte[] GenerateSalt()
    {
        byte[] salt = new byte[16];
        rnd.NextBytes(salt);
        return salt;
    }

    public string Hash(string password, byte[] salt)
    {
        SHA256 hash = SHA256.Create();

        var passwordBytes = Encoding.Default.GetBytes(password + salt);

        var hashedPass = hash.ComputeHash(passwordBytes);

        return Convert.ToHexString(hashedPass);
    }

    public bool CheckPassword(string enteredPassword, User user)
    {
        SHA256 hash = SHA256.Create();
        var passwordBytes = Encoding.Default.GetBytes(enteredPassword + user.Salt);
        var hashedPass = hash.ComputeHash(passwordBytes);
        var passFromUser = Convert.ToHexString(hashedPass);
        return string.Equals(passFromUser, user.Password);
    }

    public async Task<string> Login(string username, string password)
    {
        var user = _warehouseContext.Users.FirstOrDefault(u => u.Username == username);

        CheckUser(user);

        bool isPasswordValid = CheckPassword(password, user);
        
        if (!isPasswordValid)
        {
            return null;
        }
        
        string secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");
        string issuer = "http://localhost:5213";
        string audience = "http://localhost:5173/";
        
        var jwtService = new JwtService(secretKey, issuer, audience);
        string token = jwtService.GenerateToken(user);

        return token;
    }
}