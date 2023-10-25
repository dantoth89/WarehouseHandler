import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function OrderList() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        const token = localStorage.getItem('jwtToken');

        fetch('http://localhost:5213/Order', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAddClick = () => {
        window.location.href = `/addorder`;
    };

    return (
        <div className="list-Container">
            <h2 className="titles">Orders</h2>
            <Button
                variant="contained"
                className="btn"
                onClick={() => handleAddClick()}>
                Add Order
            </Button>            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order Notes</th>
                        <th>Order Date</th>
                        <th>Order Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.orderNotes}</td>
                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                            <td>
                                <tr>
                                    {order.orderSummary.split('------------------------------').map((item, index) => (
                                        <td key={index}>{item.trim()}</td>
                                    ))}
                                </tr>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
