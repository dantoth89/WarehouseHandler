using Microsoft.AspNetCore.Mvc;
using Warehouse.Services;

namespace Warehouse.Controllers;

[ApiController, Route("[controller]")]
public class TestDbController : ControllerBase
{
    private readonly ITestDbService _TestDbService;

    public TestDbController(ITestDbService testDbService)
    {
        _TestDbService = testDbService;
    }

    [HttpDelete]
    public async Task<IActionResult> CleanDB()
    {
        try
        {
            await _TestDbService.CleanDB();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateTestData()
    {
        try
        {
            await _TestDbService.CreateTestData();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}