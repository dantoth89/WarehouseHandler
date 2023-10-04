namespace SupplierTest
{
    [TestFixture]
    public class SupplierTest
    {
        private SupplierService _supplierService;
        private WarehouseContext _warehouseContext;

        [SetUp]
        public void Setup()
        {
            var optionsBuilder = new DbContextOptionsBuilder<WarehouseContext>();
            optionsBuilder.UseSqlServer(
                "Server=(localdb)\\mssqllocaldb;Trusted_Connection=True;Initial Catalog=WarehouseDb;");
            var dbContextOptions = optionsBuilder.Options;

            _warehouseContext = new WarehouseContext(dbContextOptions);

            _supplierService = new SupplierService(_warehouseContext);
        }

        [Test]
        public async Task GetSupplierTest()
        {
            var supplier = new Supplier
            {
                Name = "Supplier for SupplierTest",
                Description = "A test supplier",
                ContactPhone = "1234567890",
                ContactEmail = "test@example.com"
            };

            try
            {
                await _supplierService.AddSupplier(supplier);

                var addedSupplier = _warehouseContext.Suppliers.FirstOrDefault(s => s.Name == supplier.Name);

                var retrievedSupplier = await _supplierService.GetSupplier(addedSupplier.Id);

                Assert.NotNull(retrievedSupplier);
                Assert.AreEqual(supplier.Name, retrievedSupplier.Name);
                Assert.AreEqual(supplier.Description, retrievedSupplier.Description);
                Assert.AreEqual(supplier.ContactPhone, retrievedSupplier.ContactPhone);
                Assert.AreEqual(supplier.ContactEmail, retrievedSupplier.ContactEmail);
            }
            finally
            {
                if (supplier != null)
                {
                    var supplierToDelete = _warehouseContext.Suppliers.FirstOrDefault(s => s.Name == supplier.Name);
                    if (supplierToDelete != null)
                    {
                        _warehouseContext.Suppliers.Remove(supplierToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task AddSupplierTest()
        {
            var supplier = new Supplier
            {
                Name = "Supplier for SupplierTest",
                Description = "A test supplier",
                ContactPhone = "1234567890",
                ContactEmail = "test@example.com"
            };

            try
            {
                await _supplierService.AddSupplier(supplier);

                var addedSupplier = _warehouseContext.Suppliers.FirstOrDefault(s => s.Name == supplier.Name);

                Assert.NotNull(addedSupplier);
                Assert.AreEqual(supplier.Name, addedSupplier.Name);
                Assert.AreEqual(supplier.Description, addedSupplier.Description);
                Assert.AreEqual(supplier.ContactPhone, addedSupplier.ContactPhone);
                Assert.AreEqual(supplier.ContactEmail, addedSupplier.ContactEmail);
            }
            finally
            {
                if (supplier != null)
                {
                    var supplierToDelete = _warehouseContext.Suppliers.FirstOrDefault(s => s.Name == supplier.Name);
                    if (supplierToDelete != null)
                    {
                        _warehouseContext.Suppliers.Remove(supplierToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task UpdateSupplierTest()
        {
            var supplier = new Supplier
            {
                Name = "Supplier for SupplierTest",
                Description = "A test supplier",
                ContactPhone = "1234567890",
                ContactEmail = "test@example.com"
            };

            var updatedSupplier = new Supplier
            {
                Name = "Updated Supplier for Test",
                Description = "Updated description",
                ContactPhone = "9876543210",
                ContactEmail = "updated@example.com"
            };

            try
            {
                await _supplierService.AddSupplier(supplier);

                var addedSupplier = _warehouseContext.Suppliers.FirstOrDefault(s => s.Name == supplier.Name);

                await _supplierService.UpdateSupplier(updatedSupplier, addedSupplier.Id);

                var retrievedSupplier = await _supplierService.GetSupplier(addedSupplier.Id);

                Assert.NotNull(retrievedSupplier);
                Assert.AreEqual(updatedSupplier.Name, retrievedSupplier.Name);
                Assert.AreEqual(updatedSupplier.Description, retrievedSupplier.Description);
                Assert.AreEqual(updatedSupplier.ContactPhone, retrievedSupplier.ContactPhone);
                Assert.AreEqual(updatedSupplier.ContactEmail, retrievedSupplier.ContactEmail);
            }
            finally
            {
                if (supplier != null)
                {
                    var supplierToDelete = _warehouseContext.Suppliers.FirstOrDefault(s => s.Name == supplier.Name);
                    if (supplierToDelete != null)
                    {
                        _warehouseContext.Suppliers.Remove(supplierToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task DeleteSupplierTest()
        {
            var supplier = new Supplier
            {
                Name = "Supplier for SupplierTest",
                Description = "A test supplier",
                ContactPhone = "1234567890",
                ContactEmail = "test@example.com"
            };

            await _supplierService.AddSupplier(supplier);

            var addedSupplier = _warehouseContext.Suppliers.FirstOrDefault(s => s.Name == supplier.Name);

            var retrievedSupplier = await _supplierService.GetSupplier(addedSupplier.Id);

            Assert.NotNull(retrievedSupplier);
            Assert.AreEqual(supplier.Name, retrievedSupplier.Name);
            Assert.AreEqual(supplier.Description, retrievedSupplier.Description);
            Assert.AreEqual(supplier.ContactPhone, retrievedSupplier.ContactPhone);
            Assert.AreEqual(supplier.ContactEmail, retrievedSupplier.ContactEmail);

            await _supplierService.DeleteSupplier(addedSupplier.Id);

            var deletedSupplier =
                await _warehouseContext.Suppliers.FirstOrDefaultAsync(s => s.Id == addedSupplier.Id);
            Assert.Null(deletedSupplier);
        }
    }
}