import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function OrderAdd() {
    const [inventories, setInventories] = useState([]);
    const [selectedInventories, setSelectedInventories] = useState({});
    const [orderNotes, setOrderNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchInventories = () => {
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
                console.log(orderData);
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

    useEffect(() => {
        fetchInventories();
    }, []);

    return (
        <div className="orderAddContainer">
            <h2 className="titles">Add Order</h2>
            <div>
                <h3>Select Inventories:</h3>
                {inventories.map((inventory) => (
                    <div key={inventory.id}>
                        <label>
                            {inventory.product.name} ({inventory.product.sku})
                        </label>
                        <input
                            type="number"
                            min="0"
                            max={maxAvailableQuantity(inventory)}
                            value={selectedInventories[inventory.id] || 0}
                            onChange={(e) =>
                                handleInventoryChange(inventory.id, parseInt(e.target.value, 10))
                            }
                        />
                        <span>Max: {maxAvailableQuantity(inventory)}</span>
                    </div>
                ))}
            </div>
            <div>
                <h3>Order Notes:</h3>
                <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                />
            </div>
            <Button variant="contained" className='btn' onClick={handleSubmit} disabled={loading}>
                Create Order
            </Button>
        </div>
    );
}

export default OrderAdd;
