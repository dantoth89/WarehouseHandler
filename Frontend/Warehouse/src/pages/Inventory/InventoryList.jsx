import React, { useEffect, useState } from 'react';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Navbar from '../Navbar';

function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const filtered = inventory.filter((item) =>
            (name === '' || item.product.name.toLowerCase().includes(name.toLowerCase())) &&
            (sku === '' || item.product.sku.toLowerCase().includes(sku.toLowerCase())) &&
            (description === '' || item.product.description.toLowerCase().includes(description.toLowerCase()))
        );
        setInventory(filtered);
    }, [name, sku, description]);


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
        const filtered = inventory.filter((item) =>
            (name === '' || item.product.name.toLowerCase().includes(name.toLowerCase())) &&
            (sku === '' || item.product.sku.toLowerCase().includes(sku.toLowerCase())) &&
            (description === '' || item.product.description.toLowerCase().includes(description.toLowerCase()))
        );
        setInventory(filtered);
    }, [name, sku, description]);

    const handleDeleteClick = (id) => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete this inventory?'
        );

        if (shouldDelete) {
            deleteInventory(id);
        }
    };

    const deleteInventory = (id) => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/inventory/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setInventory((prevInventory) =>
                        prevInventory.filter((inventory) => inventory.id !== id)
                    );
                } else {
                    console.error('Failed to delete inventory. Status:', res.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const resetSearch = () => {
        setName('');
        setSku('');
        setDescription('');
        inventoryList();
    };

    useEffect(() => {
        inventoryList();
        locationList();
    }, []);

    const handleInfoClick = (id) => {
        window.location.href = `/inventoryinfo/${id}`;
    };

    const handleAddClick = () => {
        window.location.href = `/addinventory`;
    };

    return (
        <>
            <Navbar />{Navbar}
            <div className="list-container">
                <h2 className="titles">Inventory</h2>
                <div className="addbtn">
                    <Button
                        variant="contained"
                        className="addbtn"
                        onClick={() => handleAddClick()}>
                        Add Inventory
                    </Button>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Product Name"
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
                    <Button variant="contained" className='btn' onClick={resetSearch}>Reset Search</Button>
                </div>
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
                                    <ButtonGroup variant="contained" className='btngrp'>
                                        <Button
                                            variant="contained"
                                            className="btn"
                                            onClick={() => handleInfoClick(item.id)}>
                                            Info
                                        </Button>
                                        <Button variant="contained" className='btn' onClick={() => handleDeleteClick(item.id)}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default InventoryList;
