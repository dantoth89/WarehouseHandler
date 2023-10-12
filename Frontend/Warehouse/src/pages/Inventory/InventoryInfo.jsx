import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function InventoryInfo() {
    const { id } = useParams();
    const [inventory, setInventory] = useState({
        product: {
            name: '',
            sku: '',
            description: '',
        },
        location: '',
        quantity: 0,
    });

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
    }, [id]);

    const handleUpdate = () => {
        // Implement update functionality if needed
    };

    return (
        <>
            <h2>Inventory Info</h2>
            <form>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={inventory.product.name}
                        readOnly
                    />
                </div>
                <div>
                    <label>SKU:</label>
                    <input
                        type="text"
                        name="sku"
                        value={inventory.product.sku}
                        readOnly
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={inventory.product.description}
                        readOnly
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={inventory.location}
                        readOnly
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={inventory.quantity}
                        readOnly
                    />
                </div>
                {/* Add an update button if needed */}
                {/* <button type="button" onClick={handleUpdate}>
                    Update Inventory
                </button> */}
                <Link to={`/inventories/`}>
                    Back
                </Link>
            </form>
        </>
    );
}

export default InventoryInfo;
