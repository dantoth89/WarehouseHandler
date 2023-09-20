using Microsoft.EntityFrameworkCore;
using Warehouse.Models.Entities;

namespace Warehouse.Data;

public class WarehouseContext : DbContext
{
    public DbSet<Inventory> Inventories { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public string DbPath { get; }
    
    private readonly IConfiguration Configuration; 
    
    public WarehouseContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    
    
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        string connectionString = Configuration.GetConnectionString("WarehouseDb");
        options.UseSqlServer(connectionString);
    }
    
    
    
    
    
    
    
}