import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LocationList() {
    const [locations, setLocations] = useState([]);
    const [locationCode, setLocationCode] = useState(''); // Added state
    const [notes, setNotes] = useState(''); // Added state

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
    };

    useEffect(() => {
        locationList();
    }, []);

    return (
        <div className="locationContainer">
            <h2 className="titles">Locations</h2>
            <Link to="/locationadd">Add Location</Link>
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
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location Code</th>
                        <th>Notes</th>
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
                                    <Link to={`/locationinfo/${location.id}`}>Update</Link>
                                    <button onClick={() => handleDeleteClick(location.id)} className="btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default LocationList;
