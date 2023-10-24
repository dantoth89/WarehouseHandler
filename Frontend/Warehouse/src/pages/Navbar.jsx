import React from 'react';

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
        <header>
            <nav>
                <button onClick={suppliers}>Suppliers</button>
                <button onClick={products}>Products</button>
                <button onClick={locations}>Locations</button>
                <button onClick={inventories}>Inventories</button>
                <button onClick={orders}>Orders</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
}

export default Navbar;
