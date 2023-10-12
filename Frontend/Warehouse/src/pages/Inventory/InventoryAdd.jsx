import React, { useState, useEffect } from 'react';

function InventoryAdd() {
    const [inventory, setInventory] = useState({
        productId: '',
        locationId: '',
        quantity: '',
    });

    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventory({
            ...inventory,
            [name]: value,
        });
    };

    const handleAddInventory = () => {
        const token = localStorage.getItem('jwtToken');

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

    useEffect(() => {
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
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });

        fetch('http://localhost:5213/location', {
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
    }, []);

    return (
        <>
            <h2>Add Inventory</h2>
            <form>
                <div>
                    <label>Product:</label>
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
                <div>
                    <label>Location:</label>
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
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={inventory.quantity}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleAddInventory}>
                    Add Inventory
                </button>
            </form>
        </>
    );
}

export default InventoryAdd;
