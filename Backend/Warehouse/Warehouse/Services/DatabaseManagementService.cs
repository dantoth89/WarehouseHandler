using Microsoft.EntityFrameworkCore;
using Warehouse.Data;

namespace Warehouse.Services;

public class DatabaseManagementService
{
    public static void MigrationInitialisation(IApplicationBuilder app)
    {
        using (var serviceScope = app.ApplicationServices.CreateScope())
        {
            serviceScope.ServiceProvider.GetService<WarehouseContext>().Database.Migrate();
        }
    }
}