import React, { useState } from 'react';
import Button from '@mui/material/Button';

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
            <h2>Add Location</h2>
            <form>
                <div>
                    <label>Location Code:</label>
                    <input
                        type="text"
                        name="locationCode"
                        value={location.locationCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea
                        type="text"
                        name="notes"
                        value={location.notes}
                        onChange={handleInputChange}
                    />
                </div>
                <Button variant="contained" className='btn' type="button" onClick={handleAddLocation}>
                    Add Location
                </Button>
            </form>
        </>
    );
}

export default LocationAdd;
