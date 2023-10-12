using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Models.DTO;
using Warehouse.Services;
using Warehouse.Models.Entities;

namespace Warehouse.Controllers;

[Authorize]
[ApiController, Route("[controller]")]
public class InventoryController : ControllerBase
{
    private readonly IInventoryService _inventoryService;

    public InventoryController(IInventoryService inventoryService)
    {
        _inventoryService = inventoryService;
    }
    
    [HttpPost]
    public async Task<IActionResult> AddInventory([FromBody] InventoryDTO inventory)
    {
        try
        {
            await _inventoryService.AddInventory(inventory);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetInventory(long id)
    {
        try
        {
            var inventory = await _inventoryService.GetInventory(id);
            return Ok(inventory);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllInventories()
    {
        try
        {
            var inventories = await _inventoryService.GetAllInventories();
            return Ok(inventories);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInventory([FromBody] Inventory inventory, long id)
    {
        try
        {
            await _inventoryService.UpdateInventory(inventory, id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInventory(long id)
    {
        try
        {
            await _inventoryService.DeleteInventory(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}