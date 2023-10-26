import React from 'react';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

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
                <ButtonGroup variant="contained" className='btngrp'>
                    <Button onClick={suppliers}>Suppliers</Button>
                    <Button onClick={products}>Products</Button>
                    <Button onClick={locations}>Locations</Button>
                    <Button onClick={inventories}>Inventories</Button>
                    <Button onClick={orders}>Orders</Button>
                    <Button onClick={handleLogout}>Logout</Button>
                </ButtonGroup>
            </nav>
        </header>
    );
}

export default Navbar;
