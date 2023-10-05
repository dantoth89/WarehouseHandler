import React, { useEffect, useState } from 'react';

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);

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

    return (
        <div className="supplierContainer">
            <h2 className="titles">Suppliers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.description}</td>
                            <td>{supplier.contactphone}</td>
                            <td>{supplier.contactemail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SupplierList;
