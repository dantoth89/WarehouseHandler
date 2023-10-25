import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function ProductAdd() {
    const [product, setProduct] = useState({
        name: '',
        SKU: '',
        description: '',
        supplierId: '',
    });

    const [suppliers, setSuppliers] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSupplierChange = (e) => {
        setProduct({
            ...product,
            supplierId: e.target.value,
        });
    };

    const handleClick = () => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                window.location.href = '/products';
                return res.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetch('http://localhost:5213/supplier', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setSuppliers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>SKU:</label>
                    <input
                        type="text"
                        name="SKU"
                        value={product.SKU}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Supplier:</label>
                    <select
                        name="supplierId"
                        value={product.supplierId}
                        onChange={handleSupplierChange}
                    >
                        <option value="">Select a supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button variant="contained" className='btn' type="button" onClick={handleClick}>
                    Add Product
                </Button>
            </form>
        </>
    );
}

export default ProductAdd;
