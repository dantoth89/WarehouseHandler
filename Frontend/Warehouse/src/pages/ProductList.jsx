import React, { useEffect, useState } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);



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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        productList();
    }, []);

    return (
        <div className="productContainer">
            <h2 className="titles">Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Supplier</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.SKU}</td>
                            <td>{product.description}</td>
                            <td>{product.supplier}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
