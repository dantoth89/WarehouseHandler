namespace ProductTest
{
    [TestFixture]
    public class ProductTest
    {
        private ProductService _productService;
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
            _productService = new ProductService(_warehouseContext);
        }

        [Test]
        public async Task TestNotNull()
        {
            Assert.NotNull(_warehouseContext);
        }

        [Test]
        public async Task AddProductTest()
        {
            var product = new Product
            {
                Name = "Test Product",
                SKU = "TP001",
                Description = "A test product",
            };

            try
            {
                await _productService.AddProduct(product);

                var addedProduct = _warehouseContext.Products.FirstOrDefault(p => p.Name == product.Name);

                Assert.NotNull(addedProduct);
                Assert.AreEqual(product.Name, addedProduct.Name);
                Assert.AreEqual(product.SKU, addedProduct.SKU);
                Assert.AreEqual(product.Description, addedProduct.Description);
            }
            finally
            {
                if (product != null)
                {
                    var productToDelete = _warehouseContext.Products.FirstOrDefault(p => p.Name == product.Name);
                    if (productToDelete != null)
                    {
                        _warehouseContext.Products.Remove(productToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task GetProductTest()
        {
            var product = new Product
            {
                Name = "Test Product",
                SKU = "TP001",
                Description = "A test product",
            };

            try
            {
                await _productService.AddProduct(product);

                var productToRetrieve = _warehouseContext.Products.FirstOrDefault(p => p.Name == product.Name);
                var retrievedProduct = await _productService.GetProduct(productToRetrieve.Id);

                Assert.NotNull(retrievedProduct);
                Assert.AreEqual(product.Name, retrievedProduct.Name);
                Assert.AreEqual(product.SKU, retrievedProduct.SKU);
                Assert.AreEqual(product.Description, retrievedProduct.Description);
            }
            finally
            {
                if (product != null)
                {
                    var productToDelete = _warehouseContext.Products.FirstOrDefault(p => p.Name == product.Name);
                    if (productToDelete != null)
                    {
                        _warehouseContext.Products.Remove(productToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task UpdateProductTest()
        {
            var product = new Product
            {
                Name = "Test Product",
                SKU = "TP001",
                Description = "A test product",
            };

            var updatedProduct = new Product
            {
                Name = "Updated Product",
                SKU = "UP001",
                Description = "An updated product",
            };


            try
            {
                await _productService.AddProduct(product);

                var productToRetrieve = _warehouseContext.Products.FirstOrDefault(p => p.Name == product.Name);
                var retrievedProduct = await _productService.GetProduct(productToRetrieve.Id);

                Assert.NotNull(retrievedProduct);

                await _productService.UpdateProduct(updatedProduct, retrievedProduct.Id);

                var updatedProductToCheck = await _productService.GetProduct(retrievedProduct.Id);

                Assert.NotNull(updatedProductToCheck);
                Assert.AreEqual(updatedProduct.Name, updatedProductToCheck.Name);
                Assert.AreEqual(updatedProduct.SKU, updatedProductToCheck.SKU);
                Assert.AreEqual(updatedProduct.Description, updatedProductToCheck.Description);
            }
            finally
            {
                if (product != null)
                {
                    var productToDelete = _warehouseContext.Products.FirstOrDefault(p => p.Name == updatedProduct.Name);
                    if (productToDelete != null)
                    {
                        _warehouseContext.Products.Remove(productToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task DeleteProductTest()
        {
            var product = new Product
            {
                Name = "Test Product",
                SKU = "TP001",
                Description = "A test product",
            };


            await _productService.AddProduct(product);

            var productToRetrieve = _warehouseContext.Products.FirstOrDefault(p => p.Name == product.Name);
            var retrievedProduct = await _productService.GetProduct(productToRetrieve.Id);

            Assert.NotNull(retrievedProduct);

            await _productService.DeleteProduct(productToRetrieve.Id);

            var deletedProduct = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.Id == productToRetrieve.Id);

            Assert.Null(deletedProduct);
        }
    }
}