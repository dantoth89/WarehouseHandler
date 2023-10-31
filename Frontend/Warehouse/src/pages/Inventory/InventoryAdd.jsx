import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

function InventoryAdd() {
    const [inventory, setInventory] = useState({
        productId: '',
        locationId: '',
        quantity: '',
    });

    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventory({
            ...inventory,
            [name]: value,
        });
    };

    const handleAddInventory = () => {
        const token = localStorage.getItem('jwtToken');

        if (inventory.quantity <= 0) {
            setError('Quantity must be greater than 0');
            return;
        }

        setError(null);

        fetch('http://localhost:5213/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(inventory),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                window.location.href = '/inventories';
                return res.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const fetchProducts = (token) => {
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
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchLocations = (token) => {
        fetch('http://localhost:5213/inventory/unusedlocations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLocations(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleBack = () => {
        window.location.href = `/inventories`;
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetchProducts(token);
        fetchLocations(token);
    }, []);

    return (
        <>
            <Navbar />
            <h2 className='titles'>Add Inventory</h2>
            <form className='info-container'>
                <div className='info-fields'>
                    <label>Product:</label>
                    <div>
                        <select
                            name="productId"
                            value={inventory.productId}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.id} - {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label>Location:</label>
                    <div>
                        <select
                            name="locationId"
                            value={inventory.locationId}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.id} - {location.locationCode}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label>Quantity:</label>
                    <div>
                        <input
                            type="number"
                            name="quantity"
                            value={inventory.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {error && <p className="error">{error}</p>}
                <ButtonGroup variant="contained" className='btngrp'>

                    <Button variant="contained" className='btn' type="button" onClick={handleAddInventory}>
                        Add Inventory
                    </Button>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </>
    );
}

export default InventoryAdd;
