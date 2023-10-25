import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function LocationList() {
    const [locations, setLocations] = useState([]);
    const [locationCode, setLocationCode] = useState('');
    const [notes, setNotes] = useState('');
    const [usedLocations, setUsedLocations] = useState([]);

    const locationList = () => {
        const token = localStorage.getItem('jwtToken');

        fetch('http://localhost:5213/location', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLocations(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchUsedLocations = () => {
        const token = localStorage.getItem('jwtToken');

        fetch('http://localhost:5213/inventory/usedlocations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsedLocations(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteClick = (id) => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete this location?'
        );

        if (shouldDelete) {
            deleteLocation(id);
        }
    };

    const deleteLocation = (id) => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/location/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setLocations((prevLocations) =>
                        prevLocations.filter((location) => location.id !== id)
                    );
                } else {
                    console.error('Failed to delete location. Status:', res.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        fetchUsedLocations();
    };

    const resetSearch = () => {
        setLocationCode('');
        setNotes('');
        locationList();
    };

    useEffect(() => {
        locationList();
        fetchUsedLocations();
    }, []);

    const handleInfoClick = (id) => {
        window.location.href = `/locationinfo/${id}`;
    };

    const handleAddClick = () => {
        window.location.href = `/addlocation`;
    };

    return (
        <div className="list-Container">
            <h2 className="titles">Locations</h2>
            <Button
                variant="contained"
                className="btn"
                onClick={() => handleAddClick()}>
                Add Location
            </Button>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Location Code"
                    value={locationCode}
                    onChange={(e) => setLocationCode(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <Button variant="contained" className='btn' onClick={resetSearch}>Reset Search</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location Code</th>
                        <th>Notes</th>
                        <th>In Use</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations
                        .filter((location) =>
                            (locationCode === '' || location.locationCode.toLowerCase().includes(locationCode.toLowerCase())) &&
                            (notes === '' || location.notes.toLowerCase().includes(notes.toLowerCase()))
                        )
                        .map((location) => (
                            <tr key={location.id}>
                                <td>{location.id}</td>
                                <td>{location.locationCode}</td>
                                <td>{location.notes}</td>
                                <td>
                                    {usedLocations.some(usedLocation => usedLocation.id === location.id) ? 'X' : '-'}
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        className="btn"
                                        onClick={() => handleInfoClick(location.id)}>
                                        Info
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className='btn'
                                        onClick={() => handleDeleteClick(location.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default LocationList;
