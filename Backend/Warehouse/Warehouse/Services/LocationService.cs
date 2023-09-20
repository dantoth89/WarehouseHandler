using Warehouse.Models.Entities;

namespace Warehouse.Services;

public class LocationService : ILocationService
{
    public Task<Location> GetLocation(long locationId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Location>> GetAllLocations()
    {
        throw new NotImplementedException();
    }

    public Task AddLocation(Location location)
    {
        throw new NotImplementedException();
    }

    public Task UpdateLocation(Location location, long id)
    {
        throw new NotImplementedException();
    }

    public Task DeleteLocation(long id)
    {
        throw new NotImplementedException();
    }
}