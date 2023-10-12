using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;
using Warehouse.Services;

public class LocationService : ILocationService
{
    private readonly WarehouseContext _warehouseContext;

    public LocationService(WarehouseContext warehouseContext)
    {
        _warehouseContext = warehouseContext;
    }

    public async Task<Location> GetLocation(long locationId)
    {
        var location = await _warehouseContext.Locations
            .FirstOrDefaultAsync(l => l.Id == locationId);

        if (location == null)
        {
            throw new ArgumentException($"Location with Id {locationId} does not exist");
        }

        return location;
    }

    public async Task<List<Location>> GetAllLocations()
    {
        var locations = await _warehouseContext.Locations.ToListAsync();
        return locations;
    }

    public async Task AddLocation(Location location)
    {
        _warehouseContext.Locations.Add(location);
        await _warehouseContext.SaveChangesAsync();
    }

    public async Task UpdateLocation(Location updatedLocation, long id)
    {
        var locationToUpdate = await _warehouseContext.Locations
            .FirstOrDefaultAsync(l => l.Id == id);

        if (locationToUpdate == null)
        {
            throw new ArgumentException($"Location with Id {id} does not exist");
        }

        locationToUpdate.LocationCode = updatedLocation.LocationCode;
        locationToUpdate.Notes = updatedLocation.Notes;

        await _warehouseContext.SaveChangesAsync();
    }

    public async Task DeleteLocation(long id)
    {
        var locationToDelete = await _warehouseContext.Locations
            .FirstOrDefaultAsync(l => l.Id == id);

        if (locationToDelete == null)
        {
            throw new ArgumentException($"Location with Id {id} does not exist");
        }

        _warehouseContext.Locations.Remove(locationToDelete);
        await _warehouseContext.SaveChangesAsync();
    }
}
