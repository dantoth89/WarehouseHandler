import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const productList = () => {
        const token = localStorage.getItem('jwtToken');

        fetch('http://localhost:5213/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        productList();
    }, []);

    const handleSearchClick = () => {
        const filtered = products.filter((product) =>
            `${product.name} ${product.SKU} ${product.description} ${product.supplier}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleDeleteClick = () => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (shouldDelete) {
            deleteSnippet();
        }
    };

    return (
        <div className="productContainer">
            <h2 className="titles">Products</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearchClick}>Search</button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.SKU}</td>
                            <td>{product.description}</td>
                            <td>{product.supplier}</td>
                            <td>
                                <Link to={`/updateProduct/${product.id}`}>
                                    Update
                                </Link>
                            </td>
                            <td>
                                <button onClick={handleDeleteClick} className="btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
