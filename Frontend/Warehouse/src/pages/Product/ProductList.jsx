import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [supplier, setSupplier] = useState('');
    const [supplierName, setSupplierName] = useState('');



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

    useEffect(() => {
        const filtered = products.filter((product) =>
            (name === '' || product.name.toLowerCase().includes(name.toLowerCase())) &&
            (sku === '' || product.SKU.toLowerCase().includes(sku.toLowerCase())) &&
            (description === '' || product.description.toLowerCase().includes(description.toLowerCase())) &&
            (supplier === '' || product.supplier.toLowerCase().includes(supplier.toLowerCase()))
        );
        setProducts(filtered);
    }, [name, sku, description, supplier]);


    const handleDeleteClick = (id) => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete this product?'
        );

        if (shouldDelete) {
            deleteProduct(id);
        }
    };

    const toSupplierPage = (id) => {
        window.location.href = `/supplierupdate/${id}`;
    }

    const deleteProduct = (id) => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setProducts((prevProduct) =>
                        prevProduct.filter((product) => product.id !== id)
                    );
                } else {
                    console.error('Failed to delete product. Status:', res.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="productContainer">
            <h2 className="titles">Products</h2>
            <Link to={`/productadd`}>Add Product</Link>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Supplier"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                />
            </div>
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
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.description}</td>
                            <td onClick={() => toSupplierPage(product.supplier.id)}>{product.supplier.name}</td>
                            <td>
                                <Link to={`/productupdate/${product.id}`}>
                                    Update
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(product.id)}
                                    className="btn"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
