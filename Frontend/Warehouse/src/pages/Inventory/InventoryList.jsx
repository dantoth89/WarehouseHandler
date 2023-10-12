import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [locations, setLocations] = useState([]);

    const inventoryList = () => {
        const token = localStorage.getItem('jwtToken');

        fetch('http://localhost:5213/inventory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setInventory(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const locationList = () => {
        const token = localStorage.getItem('jwtToken');

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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getLocation = (id) => {
        const location = locations.find((loc) => loc.id === id);

        if (location) {
            return location.locationCode;
        } else {
            return "Missing location";
        }
    }

    useEffect(() => {
        inventoryList();
        locationList();
    }, []);

    return (
        <div className="inventoryContainer">
            <h2 className="titles">Inventory</h2>
            <Link to={`/inventoryadd`}>Add Inventory Item</Link>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.product.name}</td>
                            <td>{item.product.sku}</td>
                            <td>{item.product.description}</td>
                            <td>{getLocation(item.locationId)}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <Link to={`/inventoryinfo/${item.id}`}>
                                    Update
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(item.id)}
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

export default InventoryList;
