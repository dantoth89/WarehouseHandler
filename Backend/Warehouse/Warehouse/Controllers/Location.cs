using Microsoft.AspNetCore.Mvc;
using Warehouse.Services;
using Warehouse.Models.Entities;

namespace Warehouse.Controllers;


[ApiController, Route("[controller]")]
public class LocationController : ControllerBase
{
    private readonly ILocationService _locationService;

    public LocationController(ILocationService locationService)
    {
        _locationService = locationService;
    }
    
    [HttpPost]
    public async Task<IActionResult> AddLocation([FromBody] Location location)
    {
        try
        {
            await _locationService.AddLocation(location);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetLocation(long id)
    {
        try
        {
            var location = await _locationService.GetLocation(id);
            return Ok(location);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllLocations()
    {
        try
        {
            var locations = await _locationService.GetAllLocations();
            return Ok(locations);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLocation([FromBody] Location location, long id)
    {
        try
        {
            await _locationService.UpdateLocation(location, id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLocation(long id)
    {
        try
        {
            await _locationService.DeleteLocation(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}