import React from 'react';
import './Header.css';

function Header({ appName, componentName, onLogout }) {
    return (
        <header className="App-header">
            <span className="App-header-name">{appName}</span>
            <span className="App-header-component">{componentName}</span>
            <button className='Logout' onClick={onLogout}>Cerrar sesión</button>
        </header>
    );
}

export default Header;