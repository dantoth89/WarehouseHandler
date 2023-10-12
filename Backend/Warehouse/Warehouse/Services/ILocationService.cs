using Warehouse.Models.Entities;

namespace Warehouse.Services;

public interface ILocationService
{
    Task<Location> GetLocation(long locationId);
    
    Task<List<Location>> GetAllLocations();
    
    Task AddLocation(Location location);
    
    Task UpdateLocation(Location location, long id);
    
    Task DeleteLocation(long id);
}