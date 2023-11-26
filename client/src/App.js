import React, { useState } from "react";
import "./App.css";
import Productos from "./Components/Productos";
import Usuarios from "./Components/Users";
import Header from "./Components/Header";
import Proveedores from "./Components/Proveedores";
import Login from "./Components/Login"; // Asegúrate de importar el componente Login aquí
import useAuth from "./Components/useAuth"; // Importa el hook personalizado useAuth

function App() {
 const [activeComponent, setActiveComponent] = useState("");
 const { auth, handleLogin, handleLogout } = useAuth(); // Utiliza el hook personalizado useAuth

 function handleMenuClick(component) {
    setActiveComponent(component);
 }

 return (
    <div className="App">
      <Header appName="CANDY DETAILS" componentName={activeComponent} onLogout={handleLogout} />
      <div className="Rute-Component">POS SYSTEM</div>

      {auth ? (
        <>
          <section className="App-sidebar">
            <button className="ButSide" onClick={() => handleMenuClick("Productos")}>Productos</button>
            <button className="ButSide" onClick={() => handleMenuClick("Usuarios")}>Usuarios</button>
            <button className="ButSide" onClick={() => handleMenuClick("Proveedores")}>
              Proveedores
            </button>
          </section>
          <section className="App-content">
            {activeComponent === "Productos" && <Productos />}
            {activeComponent === "Usuarios" && <Usuarios />}
            {activeComponent === "Proveedores" && <Proveedores />}
          </section>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
 );
}

export default App;