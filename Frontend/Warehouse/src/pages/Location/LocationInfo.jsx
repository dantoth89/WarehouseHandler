import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';


function LocationInfo() {
    const { id } = useParams();
    const [location, setLocation] = useState({
        locationCode: '',
        notes: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/location/${id}`, {
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
                setLocation(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocation({
            ...location,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/location/${id}`, {
            method: 'PUT',
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleBack = () => {
        window.location.href = `/locations`;
    }

    return (
        <>
            <Navbar />
            <h2 className="titles">Location Info</h2>
            <form className='info-container'>
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
                            name="notes"
                            value={location.notes}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <ButtonGroup variant="contained" className='btngrp'>

                    <Button variant="contained" className='btn' type="button" onClick={handleUpdate}>
                        Update Location
                    </Button>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </>
    );
}

export default LocationInfo;
