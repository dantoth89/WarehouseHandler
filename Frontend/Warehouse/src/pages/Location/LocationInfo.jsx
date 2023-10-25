import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

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

    return (
        <>
            <h2>Location Info</h2>
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
                        name="notes"
                        value={location.notes}
                        onChange={handleInputChange}
                    />
                </div>
                <Button variant="contained" className='btn' type="button" onClick={handleUpdate}>
                    Update Location
                </Button>
                <Link to={`/locations/`}>
                    Back
                </Link>
            </form>
        </>
    );
}

export default LocationInfo;
