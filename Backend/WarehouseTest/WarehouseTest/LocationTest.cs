using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.Entities;
using Warehouse.Services;

namespace LocationTest
{
    [TestFixture]
    public class LocationTest
    {
        private LocationService _locationService;
        private WarehouseContext _warehouseContext;

        [SetUp]
        public void Setup()
        {
            var optionsBuilder = new DbContextOptionsBuilder<WarehouseContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Trusted_Connection=True;Initial Catalog=WarehouseDb;");
            var dbContextOptions = optionsBuilder.Options;

            _warehouseContext = new WarehouseContext(dbContextOptions);

            _locationService = new LocationService(_warehouseContext);
        }

        [Test]
        public async Task GetLocationTest()
        {
            var location = new Location
            {
                Aisle = "A1",
                Shelf = "S2",
                Bin = "B3"
            };

            try
            {
                await _locationService.AddLocation(location);

                var addedLocation = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);

                var retrievedLocation = await _locationService.GetLocation(addedLocation.LocationId);

                Assert.NotNull(retrievedLocation);
                Assert.AreEqual(location.Aisle, retrievedLocation.Aisle);
                Assert.AreEqual(location.Shelf, retrievedLocation.Shelf);
                Assert.AreEqual(location.Bin, retrievedLocation.Bin);
            }
            finally
            {
                if (location != null)
                {
                    var locationToDelete = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);
                    if (locationToDelete != null)
                    {
                        _warehouseContext.Locations.Remove(locationToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task AddLocationTest()
        {
            var location = new Location
            {
                Aisle = "A1",
                Shelf = "S2",
                Bin = "B3"
            };

            try
            {
                await _locationService.AddLocation(location);

                var addedLocation = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);

                Assert.NotNull(addedLocation);
                Assert.AreEqual(location.Aisle, addedLocation.Aisle);
                Assert.AreEqual(location.Shelf, addedLocation.Shelf);
                Assert.AreEqual(location.Bin, addedLocation.Bin);
            }
            finally
            {
                if (location != null)
                {
                    var locationToDelete = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);
                    if (locationToDelete != null)
                    {
                        _warehouseContext.Locations.Remove(locationToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task UpdateLocationTest()
        {
            var location = new Location
            {
                Aisle = "A1",
                Shelf = "S2",
                Bin = "B3"
            };

            var updatedLocation = new Location
            {
                Aisle = "A2",
                Shelf = "S3",
                Bin = "B4"
            };

            try
            {
                await _locationService.AddLocation(location);

                var addedLocation = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);

                await _locationService.UpdateLocation(updatedLocation, addedLocation.LocationId);

                var retrievedLocation = await _locationService.GetLocation(addedLocation.LocationId);

                Assert.NotNull(retrievedLocation);
                Assert.AreEqual(updatedLocation.Aisle, retrievedLocation.Aisle);
                Assert.AreEqual(updatedLocation.Shelf, retrievedLocation.Shelf);
                Assert.AreEqual(updatedLocation.Bin, retrievedLocation.Bin);
            }
            finally
            {
                if (location != null)
                {
                    var locationToDelete = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);
                    if (locationToDelete != null)
                    {
                        _warehouseContext.Locations.Remove(locationToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task DeleteLocationTest()
        {
            var location = new Location
            {
                Aisle = "A1",
                Shelf = "S2",
                Bin = "B3"
            };

            try
            {
                await _locationService.AddLocation(location);

                var addedLocation = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);

                var retrievedLocation = await _locationService.GetLocation(addedLocation.LocationId);

                Assert.NotNull(retrievedLocation);
                Assert.AreEqual(location.Aisle, retrievedLocation.Aisle);
                Assert.AreEqual(location.Shelf, retrievedLocation.Shelf);
                Assert.AreEqual(location.Bin, retrievedLocation.Bin);

                await _locationService.DeleteLocation(addedLocation.LocationId);

                var deletedLocation = await _warehouseContext.Locations.FirstOrDefaultAsync(l => l.LocationId == addedLocation.LocationId);

                Assert.Null(deletedLocation);
            }
            finally
            {
                if (location != null)
                {
                    var locationToDelete = _warehouseContext.Locations.FirstOrDefault(l => l.Aisle == location.Aisle);
                    if (locationToDelete != null)
                    {
                        _warehouseContext.Locations.Remove(locationToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }
    }
}
