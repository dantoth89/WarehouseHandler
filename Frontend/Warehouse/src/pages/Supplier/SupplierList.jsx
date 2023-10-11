import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
        supplierList();
    }, []);

    const filterSuppliers = (supplier) => {
        return (
            supplier.name.includes(searchValues.name) &&
            supplier.description.includes(searchValues.description) &&
            supplier.contactPhone.includes(searchValues.contactPhone) &&
            supplier.contactEmail.includes(searchValues.contactEmail)
        );
    };

    return (
        <div className="supplierContainer">
            <Link to={`/addsupplier`}>Add supplier</Link>
            <h2 className="titles">Suppliers</h2>
            <div className="search-fields">
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
                    {suppliers
                        .filter(filterSuppliers)
                        .map((supplier) => (
                            <tr key={supplier.id}>
                                <td>{supplier.id}</td>
                                <td>{supplier.name}</td>
                                <td>{supplier.description}</td>
                                <td>{supplier.contactPhone}</td>
                                <td>{supplier.contactEmail}</td>
                                <td>
                                    <Link to={`/supplierupdate/${supplier.id}`}>
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(supplier.id)}
                                        className="btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default SupplierList;
