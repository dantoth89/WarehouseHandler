using Microsoft.AspNetCore.Mvc;
using Warehouse.Services;
using Warehouse.Models.Entities;

namespace Warehouse.Controllers;


[ApiController, Route("[controller]")]
public class SupplierController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public SupplierController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }
    
    [HttpPost]
    public async Task<IActionResult> AddSupplier([FromBody] Supplier supplier)
    {
        try
        {
            await _supplierService.AddSupplier(supplier);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSupplier(long id)
    {
        try
        {
            var supplier = await _supplierService.GetSupplier(id);
            return Ok(supplier);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSuppliers()
    {
        try
        {
            var suppliers = await _supplierService.GetAllSuppliers();
            return Ok(suppliers);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSupplier([FromBody] Supplier supplier, long id)
    {
        try
        {
            await _supplierService.UpdateSupplier(supplier, id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSupplier(long id)
    {
        try
        {
            await _supplierService.DeleteSupplier(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}