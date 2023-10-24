import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <div className="orderContainer">
            <h2 className="titles">Orders</h2>
            <Link to="/orderadd">Add Order</Link>
            <table>
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
                                <ul>
                                    {order.orderSummary.split('------------------------------').map((item, index) => (
                                        <li key={index}>{item.trim()}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
