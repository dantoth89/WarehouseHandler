import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import Navbar from '../Navbar';



function ProductUpdate() {
    const { id } = useParams();
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        sku: '',
        description: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/product/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUpdatedProduct(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value,
        });
    };

    const handleUpdateClick = () => {
        const token = localStorage.getItem('jwtToken');

        fetch(`http://localhost:5213/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProduct),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP status ${res.status}`);
                }
                window.location.href = '/products';
                return res.json();
            })
            .then((data) => {
                console.log('Product updated successfully:', data);
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    const handleBack = () => {
        window.location.href = `/products`;
    }

    return (<>
        <Navbar />
        <div>
            <h2 className="titles">Product Info</h2>
            <form className="info-container">
                <div className='info-fields'>
                    <label>Name:</label>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label>SKU:</label>
                    <div>
                        <input
                            type="text"
                            name="sku"
                            value={updatedProduct.sku}
                            onChange={handleInputChange}
                        />
                    </div>
                    <label>Description:</label>
                    <div>
                        <textarea
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <ButtonGroup variant="contained" className='btngrp'>
                    <Button variant="contained" className='btn' type="button" onClick={handleUpdateClick}>
                        Update
                    </Button>
                    <Button className='btn' type="button" onClick={handleBack}>
                        Back
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    </>
    );
}

export default ProductUpdate;
