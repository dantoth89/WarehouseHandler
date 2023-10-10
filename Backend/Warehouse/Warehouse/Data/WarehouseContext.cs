using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Warehouse.Models.Entities;

namespace Warehouse.Data;

public class WarehouseContext : DbContext
{
    public DbSet<Inventory> Inventories { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
   
    private readonly IConfiguration Configuration; 
    
    public WarehouseContext(DbContextOptions<WarehouseContext> options) : base(options)
    {
    }
    
}