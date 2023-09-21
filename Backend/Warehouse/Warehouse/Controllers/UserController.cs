using Microsoft.AspNetCore.Mvc;
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
    
   [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] User user)
    {
        try
        {
            await _userService.AddUser(user);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser([FromBody] User user, long id)
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