import React from 'react';
import Button from '@mui/material/Button';

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
    }

    const suppliers = () => {
        window.location.href = '/suppliers';
    }

    const products = () => {
        window.location.href = '/products';
    }

    const locations = () => {
        window.location.href = '/locations';
    }

    const inventories = () => {
        window.location.href = '/inventories';
    }

    const orders = () => {
        window.location.href = '/orders';
    }

    return (
        <header className='navbar'>
            <nav>
                <Button variant="contained" onClick={suppliers}>Suppliers</Button>
                <Button variant="contained" onClick={products}>Products</Button>
                <Button variant="contained" onClick={locations}>Locations</Button>
                <Button variant="contained" onClick={inventories}>Inventories</Button>
                <Button variant="contained" onClick={orders}>Orders</Button>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </nav>
        </header>
    );
}

export default Navbar;
