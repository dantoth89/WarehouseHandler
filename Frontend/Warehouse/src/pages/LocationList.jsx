import React, { useEffect, useState } from 'react';

function LocationList() {
    const [locations, setLocations] = useState([]);

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

    useEffect(() => {
        locationList();
    }, []);

    return (
        <div className="locationContainer">
            <h2 className="titles">Locations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Aisle</th>
                        <th>Shelf</th>
                        <th>Bin</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td>{location.aisle}</td>
                            <td>{location.shelf}</td>
                            <td>{location.bin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LocationList;
