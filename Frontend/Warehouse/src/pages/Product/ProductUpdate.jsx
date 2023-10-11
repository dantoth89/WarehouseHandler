import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
                console.log(data);
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

    return (
        <div className="updateProductContainer">
            <h2 className="titles">Update Product</h2>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedProduct.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>SKU:</label>
                    <input
                        type="text"
                        name="sku"
                        value={updatedProduct.sku}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={updatedProduct.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleUpdateClick}>
                    Update
                </button>
            </form>
        </div>
    );
}

export default ProductUpdate;
