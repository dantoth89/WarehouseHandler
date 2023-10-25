import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

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

    return <>
        <form>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={supplier.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={supplier.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="contactemail"
                    value={supplier.contactemail}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Phone:</label>
                <textarea
                    type="text"
                    name="contactphone"
                    value={supplier.contactphone}
                    onChange={handleInputChange}
                />
            </div>
            <Button variant="contained" className='btn' type="button" onClick={handleClick}>
                Add supplier
            </Button>
        </form>
    </>
}

export default SupplierAdd;