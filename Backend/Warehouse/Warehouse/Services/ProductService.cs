﻿using Microsoft.EntityFrameworkCore;
using Warehouse.Data;
using Warehouse.Models.DTO;
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
                .FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null)
            {
                throw new ArgumentException($"Product with Id {productId} does not exist");
            }

            return product;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            var products = await _warehouseContext.Products.ToListAsync();
            foreach (var p in products)
            {
                p.Supplier = await _warehouseContext.Suppliers.FirstOrDefaultAsync(s => s.Id == p.SupplierId);
            }

            return products;
        }

        public async Task AddProduct(ProductDTO product)
        {
            var productToAdd = new Product
            {
                Name = product.Name,
                Description = product.Description,
                SKU = product.SKU,
                SupplierId = product.SupplierId,
                Supplier = await _warehouseContext.Suppliers.FirstOrDefaultAsync(s => s.Id == product.SupplierId)
            };
            
            _warehouseContext.Products.Add(productToAdd);
            await _warehouseContext.SaveChangesAsync();
        }

        public async Task UpdateProduct(ProductDTO updatedProduct, long id)
        {
            var productToUpdate = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (productToUpdate == null)
            {
                throw new ArgumentException($"Product with Id {id} does not exist");
            }

            productToUpdate.Name = updatedProduct.Name;
            productToUpdate.SKU = updatedProduct.SKU;
            productToUpdate.Description = updatedProduct.Description;

            await _warehouseContext.SaveChangesAsync();
        }

        public async Task DeleteProduct(long id)
        {
            var productToDelete = await _warehouseContext.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (productToDelete == null)
            {
                throw new ArgumentException($"Product with Id {id} does not exist");
            }

            _warehouseContext.Products.Remove(productToDelete);
            await _warehouseContext.SaveChangesAsync();
        }
    }
}
