import React, { useState } from 'react';
import Navbar from '../Navbar';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';


function LocationAdd() {
    const [location, setLocation] = useState({
        locationCode: '',
        notes: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocation({
            ...location,
            [name]: value,
        });
    };

    const handleBack = () => {
        window.location.href = `/locations`;
    }

    const handleAddLocation = () => {
        const token = localStorage.getItem('jwtToken');

        fetch('http://localhost:5213/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(location),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                window.location.href = '/locations';
                return res.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <Navbar />
            <h2 className='titles'> Add Location </h2>
            <form className="info-container">
                <div className='info-fields'>
                    <label>Location Code:</label>
                    <div>
                        <input
                            type="text"
                            name="locationCode"
                            value={location.locationCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label>Notes:</label>
                    <div>
                        <textarea
                            type="text"
                            name="notes"
                            value={location.notes}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <ButtonGroup variant="contained" className='btngrp'>
                    <Button variant="contained" className='btn' type="button" onClick={handleAddLocation}>
                        Add Location
                    </Button>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </>
    );
}

export default LocationAdd;
