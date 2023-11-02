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

    private void CheckLocation(Location location)
    {
        if (location == null)
            throw new ArgumentException($"Location does not exist");
    }

    public async Task<Location> GetLocation(long locationId)
    {
        var location = await _warehouseContext.Locations
            .FirstOrDefaultAsync(l => l.Id == locationId);
        CheckLocation(location);
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

        CheckLocation(locationToUpdate);

        locationToUpdate.LocationCode = updatedLocation.LocationCode;
        locationToUpdate.Notes = updatedLocation.Notes;

        await _warehouseContext.SaveChangesAsync();
    }

    public async Task DeleteLocation(long id)
    {
        var locationToDelete = await _warehouseContext.Locations
            .FirstOrDefaultAsync(l => l.Id == id);

        CheckLocation(locationToDelete);

        _warehouseContext.Locations.Remove(locationToDelete);
        await _warehouseContext.SaveChangesAsync();
    }
}
