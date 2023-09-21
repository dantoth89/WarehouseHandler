using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Warehouse.Data;
using Warehouse.Models.Entities;

namespace Warehouse.Services
{
    public class ProductService : IProductService
    {
        private readonly WarehouseContext _warehouseContext;

        public ProductService(WarehouseContext warehouseContext)
        {
            _warehouseContext = warehouseContext;
        }

        public async Task<Product> GetProduct(long productId)
        {
            var product = await _warehouseContext.Products
                .Include(p => p.Supplier) 
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
            {
                throw new ArgumentException($"Product with Id {productId} does not exist");
            }

            return product;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            var products = await _warehouseContext.Products.Include(p => p.Supplier).ToListAsync();

            return products;
        }

        public async Task AddProduct(Product product)
        {
            _warehouseContext.Products.Add(product);
            await _warehouseContext.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product updatedProduct, long id)
        {
            var productToUpdate = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.ProductId == id);

            if (productToUpdate == null)
            {
                throw new ArgumentException($"Product with Id {id} does not exist");
            }

            // Update product properties based on the provided 'updatedProduct' object.
            productToUpdate.Name = updatedProduct.Name;
            productToUpdate.SKU = updatedProduct.SKU;
            productToUpdate.Description = updatedProduct.Description;
            productToUpdate.SupplierId = updatedProduct.SupplierId; // Update Supplier if needed

            await _warehouseContext.SaveChangesAsync();
        }

        public async Task DeleteProduct(long id)
        {
            var productToDelete = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.ProductId == id);

            if (productToDelete == null)
            {
                throw new ArgumentException($"Product with Id {id} does not exist");
            }

            _warehouseContext.Products.Remove(productToDelete);
            await _warehouseContext.SaveChangesAsync();
        }
    }
}
