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
    return (
        <header>
            <nav>
                <button onClick={suppliers}>Suppliers</button>
                <button onClick={products}>Products</button>
                <button onClick={locations}>Locations</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
}

export default Navbar;
