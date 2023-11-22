import React, { useState } from "react";
import "./App.css";
import Productos from "./Components/Productos";
import Usuarios from "./Components/Users";
import Header from "./Components/Header";

function App() {
  const [activeComponent, setActiveComponent] = useState("");

  function handleMenuClick(component) {
    setActiveComponent(component);
  }

  return (
    <div className="App">
      <Header
          appName="System POS"
        />
      <div className="Rute-Component">
        {activeComponent}
      </div>

      <section className="App-sidebar">
        <button onClick={() => handleMenuClick("Productos")}>Productos</button>
        <button onClick={() => handleMenuClick("Usuarios")}>Usuarios</button>
      </section>
      <section className="App-content">
        {activeComponent === "Productos" && <Productos />}
        {activeComponent === "Usuarios" && <Usuarios />}
      </section>
    </div>
  );
}

export default App;
