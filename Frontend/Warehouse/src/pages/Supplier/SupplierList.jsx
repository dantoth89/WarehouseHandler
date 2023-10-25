import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchValues, setSearchValues] = useState({
        name: '',
        description: '',
        contactPhone: '',
        contactEmail: '',
    });

    const supplierList = () => {
        const token = localStorage.getItem('jwtToken');

        fetch('http://localhost:5213/supplier', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setSuppliers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        supplierList();
    }, []);

    useEffect(() => {
        const filtered = suppliers.filter((supplier) =>
            (searchValues.name === '' || supplier.name.toLowerCase().includes(searchValues.name.toLowerCase())) &&
            (searchValues.description === '' || supplier.description.toLowerCase().includes(searchValues.description.toLowerCase())) &&
            (searchValues.contactPhone === '' || supplier.contactPhone.toLowerCase().includes(searchValues.contactPhone.toLowerCase())) &&
            (searchValues.contactEmail === '' || supplier.contactEmail.toLowerCase().includes(searchValues.contactEmail.toLowerCase()))
        );
        setSuppliers(filtered);
    }, [searchValues]);

    const handleDeleteClick = (id) => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete this supplier?'
        );

        if (shouldDelete) {
            deleteSupplier(id);
        }
    };

    const deleteSupplier = (id) => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/supplier/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setSuppliers((prevSuppliers) =>
                        prevSuppliers.filter((supplier) => supplier.id !== id)
                    );
                } else {
                    console.error('Failed to delete supplier. Status:', res.status);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const resetSearch = () => {
        setSearchValues({
            name: '',
            description: '',
            contactPhone: '',
            contactEmail: '',
        });
        supplierList();
    };

    const handleInfoClick = (id) => {
        window.location.href = `/supplierinfo/${id}`;
    };

    const handleAddClick = () => {
        window.location.href = `/addsupplier`;
    };

    return (
        <div className="list-Container">
            <Button
                variant="contained"
                className="btn"
                onClick={() => handleAddClick()}>
                Add Supplier
            </Button>
            <h2 className="titles">Suppliers</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchValues.name}
                    onChange={(e) =>
                        setSearchValues({ ...searchValues, name: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Search by Description"
                    value={searchValues.description}
                    onChange={(e) =>
                        setSearchValues({
                            ...searchValues,
                            description: e.target.value,
                        })
                    }
                />
                <input
                    type="text"
                    placeholder="Search by Phone"
                    value={searchValues.contactPhone}
                    onChange={(e) =>
                        setSearchValues({
                            ...searchValues,
                            contactPhone: e.target.value,
                        })
                    }
                />
                <input
                    type="text"
                    placeholder="Search by Email"
                    value={searchValues.contactEmail}
                    onChange={(e) =>
                        setSearchValues({
                            ...searchValues,
                            contactEmail: e.target.value,
                        })
                    }
                />
                <Button variant="contained" className='btn' onClick={resetSearch}>Reset Search</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.description}</td>
                            <td>{supplier.contactPhone}</td>
                            <td>{supplier.contactEmail}</td>
                            <td>
                                <Button
                                    variant="contained"
                                    className="btn"
                                    onClick={() => handleInfoClick(supplier.id)}>
                                    Info
                                </Button>
                                <Button variant="contained" className='btn' onClick={() => handleDeleteClick(supplier.id)}>
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

export default SupplierList;
