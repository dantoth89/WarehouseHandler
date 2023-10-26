import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

function SupplierInfo() {
    const { id } = useParams();
    const [supplier, setSupplier] = useState({
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/supplier/${id}`, {
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
                setSupplier(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplier({
            ...supplier,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/supplier/${id}`, {
            method: 'PUT',
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleBack = () => {
        window.location.href = `/suppliers`;
    }

    return (
        <>
            <Navbar />{Navbar}
            <h2 className="titles">Supplier Info</h2>
            <form className="info-container">
                <div className='info-fields'>
                    <label>Name: </label>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={supplier.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label>Description: </label>
                    <div>
                        <textarea
                            name="description"
                            value={supplier.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label>Email: </label>
                    <div>
                        <input
                            type="text"
                            name="contactEmail"
                            value={supplier.contactEmail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label>Phone: </label>
                    <div>
                        <textarea
                            name="contactPhone"
                            value={supplier.contactPhone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <ButtonGroup variant="contained" className='btngrp'>
                    <Button className='btn' type="button" onClick={handleUpdate}>
                        Update Supplier
                    </Button>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </>
    );
}

export default SupplierInfo;
