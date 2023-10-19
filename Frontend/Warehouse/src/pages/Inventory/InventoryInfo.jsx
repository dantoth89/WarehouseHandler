import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function InventoryInfo() {
    const { id } = useParams();
    const [inventory, setInventory] = useState({
        product: '',
        location: '',
        quantity: 0,
    });

    const [locations, setLocations] = useState([]);
    const [unusedlocations, setUnusedLocations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/inventory/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setInventory(data);
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
            })
            .catch((error) => {
                console.error(error);
            });

        fetch('http://localhost:5213/inventory/unusedlocations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUnusedLocations(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const getLocation = (id) => {
        const location = locations.find((loc) => loc.id === id);

        if (location) {
            return location.locationCode;
        } else {
            return "Missing location";
        }
    }

    const handleUpdate = () => {
        const token = localStorage.getItem('jwtToken');
        const updatedInventory = {
            LocationId: parseInt(inventory.locationId),
            ProductId: inventory.product.Id,
            Quantity: parseInt(inventory.quantity),
        };

        fetch(`http://localhost:5213/inventory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedInventory),
        })
            .then((res) => {
                console.log(updatedInventory)
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                window.location.href = '/inventories';
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <h2>Inventory Info</h2>
            <div>
                <label>Product: {inventory.product.name}</label>
            </div>
            <form>
                <div>
                    {/* <label>Actual location: -- {getLocation(inventory.locationId)} -- </label>
                    <label>Can be changed to: -- </label> */}
                    <select
                        name="locationId"
                        value={inventory.locationId}
                        onChange={(e) =>
                            setInventory({ ...inventory, locationId: e.target.value })
                        }
                    >
                        <option>{getLocation(inventory.locationId)}</option>
                        {unusedlocations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.locationCode}
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
                        onChange={(e) =>
                            setInventory({ ...inventory, quantity: parseInt(e.target.value) })
                        }
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="button" onClick={handleUpdate}>
                    Update Inventory
                </button>
                <Link to={`/inventories`}>
                    Back
                </Link>
            </form>
        </>
    );
}

export default InventoryInfo;
