import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';


function OrderAdd() {
    const [inventories, setInventories] = useState([]);
    const [selectedInventories, setSelectedInventories] = useState({});
    const [orderNotes, setOrderNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchInventories = (token) => {
        fetch('http://localhost:5213/inventory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setInventories(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInventoryChange = (id, quantity) => {
        setSelectedInventories((prevSelection) => ({
            ...prevSelection,
            [id]: quantity,
        }));
    };

    const maxAvailableQuantity = (inventory) => {
        return inventory.quantity;
    };

    const handleSubmit = () => {
        const orderData = {
            notes: orderNotes,
            inventoriesToOrder: selectedInventories,
        };

        const token = localStorage.getItem('jwtToken');

        setLoading(true);

        fetch('http://localhost:5213/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Order created successfully');
                    window.location.href = '/orders';
                } else {
                    alert('Failed to create order');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to create order');
                setLoading(false);
            });
    };

    const handleBack = () => {
        window.location.href = `/orders`;
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetchInventories(token);
    }, []);

    return (<>
        <Navbar />
        <div>
            <h2 className="titles">Add Order</h2>
            <form className="info-container">
                <div className='info-fields'>
                    <label>Order Notes:</label>
                    <div>
                        <textarea
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                        />
                    </div>
                    <label>Select Inventories:</label>
                    <div>---------------------</div>
                    <div>
                        {inventories.map((inventory) => (
                            <div key={inventory.id}>
                                <label>
                                    {inventory.product.name} ({inventory.product.sku})
                                </label>
                                <div>
                                    <input
                                        type="number"
                                        min="0"
                                        max={maxAvailableQuantity(inventory)}
                                        value={selectedInventories[inventory.id] || 0}
                                        onChange={(e) =>
                                            handleInventoryChange(inventory.id, parseInt(e.target.value, 10))
                                        }
                                    />
                                    <div>Max: {maxAvailableQuantity(inventory)}</div>
                                    <div>---------------------</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ButtonGroup variant="contained" className='btngrp'>
                    <Button variant="contained" className='btn' onClick={handleSubmit} disabled={loading}>
                        Create Order
                    </Button>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    </>
    );
}

export default OrderAdd;
