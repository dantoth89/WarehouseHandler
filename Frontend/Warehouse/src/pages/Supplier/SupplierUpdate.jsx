import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SupplierUpdate() {
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

    return (
        <>
            <h2>Update Supplier</h2>
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
                        name="description"
                        value={supplier.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="contactEmail"
                        value={supplier.contactEmail}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <textarea
                        name="contactPhone"
                        value={supplier.contactPhone}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleUpdate}>
                    Update Supplier
                </button>
            </form>
        </>
    );
}

export default SupplierUpdate;
