import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import Navbar from '../Navbar';


function SupplierAdd() {
    const [supplier, setSuppliers] = useState({
        name: '',
        description: '',
        contactemail: '',
        contactphone: '',
    }
    );


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSuppliers({
            ...supplier,
            [name]: value,
        });
    };

    const handleClick = () => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/supplier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(supplier),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                window.location.href = '/suppliers';
                return res.json();
            })
    };

    const handleBack = () => {
        window.location.href = `/suppliers`;
    }

    return <>
        <Navbar />{Navbar}
        <h2 className="titles">Add supplier</h2>
        <form className="info-container">
            <div className='info-fields'>
                <label>Name:</label>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={supplier.name}
                        onChange={handleInputChange}
                    />
                </div>
                <label>Description:</label>
                <div>
                    <textarea
                        type="text"
                        name="description"
                        value={supplier.description}
                        onChange={handleInputChange}
                    />
                </div>
                <label>Email:</label>
                <div>
                    <input
                        type="text"
                        name="contactemail"
                        value={supplier.contactemail}
                        onChange={handleInputChange}
                    />
                </div>
                <label>Phone:</label>
                <div>
                    <textarea
                        type="text"
                        name="contactphone"
                        value={supplier.contactphone}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <ButtonGroup variant="contained" className='btngrp'>
                <Button className='btn' type="button" onClick={handleClick}>
                    Add supplier
                </Button>
                <Button className='btn' type="button" onClick={handleBack}>
                    Back
                </Button>
            </ButtonGroup>
        </form>
    </>
}

export default SupplierAdd;