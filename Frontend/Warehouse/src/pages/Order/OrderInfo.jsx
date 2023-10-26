import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import Navbar from '../Navbar';


function OrderUpdate() {
    const { id } = useParams();
    const [orderInfo, setOrderInfo] = useState({
        orderNotes: '',
        orderDate: '',
        orderSummary: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/order/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrderInfo(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleBack = () => {
        window.location.href = `/orders`;
    }

    return (<>
        <Navbar />{Navbar}
        <div>
            <h2 className="titles">Order Info</h2>
            <form className="info-container">
                <div className='info-fields'>
                    <label>Order Notes:</label>
                    <div>
                        <input
                            type="text"
                            name="orderNotes"
                            value={orderInfo.orderNotes}
                        />
                    </div>
                    <label>Order Date:</label>
                    <div>
                        <input
                            type="text"
                            name="orderDate"
                            value={orderInfo.orderDate}
                        />
                    </div>
                    <label>Order Summary:</label>
                    <div>
                        <textarea
                            name="orderSummary"
                            value={orderInfo.orderSummary}
                            style={{
                                minHeight: '300px',
                                minWidth: '240px',
                                height: 'auto',
                            }}
                        />
                    </div>
                </div>
                <ButtonGroup variant="contained" className='btngrp'>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    </>
    );
}

export default OrderUpdate;
