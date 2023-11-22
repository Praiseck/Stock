import React from 'react';
import './Header.css';

function Header({ appName, componentName }) {
    return (
        <header className="App-header">
            <span className="App-header-name">{appName}</span>
            <span className="App-header-component">{componentName}</span>
        </header>
    );
}

export default Header;