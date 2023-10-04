using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Models.DTO;
using Warehouse.Services;
using Warehouse.Models.Entities;

namespace Warehouse.Controllers;

[ApiController, Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserDto user)
    {
        if (user == null)
        {
            return BadRequest("Invalid input. Please provide registration data.");
        }

        if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
        {
            return BadRequest("Username and password are required.");
        }

        var existingUser = await _userService.GetUserByUsername(user.Username);

        if (existingUser != null)
        {
            return BadRequest("Username is already in use. Please choose another.");
        }

        try
        {
            await _userService.AddUser(user);
            return Ok("Registration successful!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login user)
    {
        if (user == null)
        {
            return BadRequest("Invalid input.");
        }

        if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
        {
            return BadRequest("Username and password are required.");
        }

        try
        {
            var jwtToken = _userService.Login(user.Username, user.Password);

            return Ok(jwtToken);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpGet("test")]
    public async Task<IActionResult> AuthTest()
    {
        return Ok("Auth test ok");
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(long id)
    {
        try
        {
            var user = await _userService.GetUser(id);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser([FromBody] UserDto user, long id)
    {
        try
        {
            await _userService.UpdateUser(user, id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(long id)
    {
        try
        {
            await _userService.DeleteUser(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}