import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

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

    const fetchInventory = (token) => {
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
    };

    const fetchLocations = (token) => {
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

    const fetchUnusedLocations = (token) => {
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
    };

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

    const handleBack = () => {
        window.location.href = `/inventories`;
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetchInventory(token);
        fetchLocations(token);
        fetchUnusedLocations(token);
    }, [id]);

    return (
        <>
            <Navbar />
            <h2 className='titles'>Inventory Info</h2>
            <label className='titles' >Product:</label>
            <label className='titles' >{inventory.product.name}</label>
            <form className='info-container'>
                <div className='info-fields'>
                    <label>Locaton: </label>
                    <div>
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
                    <label>Quantity:</label>
                    <div>
                        <input
                            type="number"
                            name="quantity"
                            value={inventory.quantity}
                            onChange={(e) =>
                                setInventory({ ...inventory, quantity: parseInt(e.target.value) })
                            }
                        />
                    </div>
                </div>
                {error && <p className="error">{error}</p>}
                <ButtonGroup variant="contained" className='btngrp'>
                    <Button variant="contained" className='btn' type="button" onClick={handleUpdate}>
                        Update Inventory
                    </Button>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </>
    );
}

export default InventoryInfo;
