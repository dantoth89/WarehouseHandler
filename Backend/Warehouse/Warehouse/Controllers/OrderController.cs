using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Models.DTO;
using Warehouse.Services;

namespace Warehouse.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        try
        {
            var orders = await _orderService.GetOrders();
            return Ok(orders);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpPost]
    public async Task<IActionResult> MakeOrder([FromBody] OrderDTO orderDto)
    {
        try
        {
            await _orderService.GenerateOrder(orderDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
}