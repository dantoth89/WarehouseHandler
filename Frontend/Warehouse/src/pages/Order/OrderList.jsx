import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
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

    const handleAddClick = () => {
        window.location.href = `/addorder`;
    };

    const handleInfoClick = (id) => {
        window.location.href = `/orderinfo/${id}`;
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="list-container">
                <h2 className="titles">Orders</h2>
                <div className="addbtn">
                    <Button
                        variant="contained"
                        className="addbtn"
                        onClick={() => handleAddClick()}>
                        Add Order
                    </Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Notes</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderNotes}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                <td className='btngrp'>
                                    <Button
                                        variant="contained"
                                        className="btn"
                                        onClick={() => handleInfoClick(order.id)}>
                                        Info
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OrderList;
