import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [Nombre_producto, setNombre_producto] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio_unidad, setPrecio_unidad] = useState("");
  const [Cantidad_Stock, setCantidad_Stock] = useState("");
  const [ProductList, setProductList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setProductList(response.data);
    });
  }, []);

  const submitProduct = () => {
    Axios.post("http://localhost:3001/api/insert", {
      Nombre: Nombre_producto,
      Descripcion: Descripcion,
      PrecioUnitario: Precio_unidad,
      CantidadEnStock: Cantidad_Stock,
    });

    setProductList([
      ...ProductList,
      {
        Nombre: Nombre_producto,
        Descripcion: Descripcion,
        PrecioUnitario: Precio_unidad,
        CantidadEnStock: Cantidad_Stock,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>PRODUCTOS</h1>
      <div className="form">
        <label>Nombre</label>
        <input
          type="text"
          name="Nombre_producto"
          onChange={(n) => setNombre_producto(n.target.value)}
        />
        <label>Descripcion</label>
        <input
          type="text"
          name="Descripcion"
          onChange={(d) => setDescripcion(d.target.value)}
        />
        <label>Precio Unidad</label>
        <input
          type="text"
          name="Precio_unidad"
          onChange={(p) => setPrecio_unidad(p.target.value)}
        />
        <label>Cantidad en Stock</label>
        <input
          type="text"
          name="Cantidad_Stock"
          onChange={(s) => setCantidad_Stock(s.target.value)}
        />

        <button onClick={submitProduct}>Ingresar</button>
      </div>
      <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Cantidad en Inventario</th>
              <th>Precio unitario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ProductList.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.ProductoID}</td>
                  <td>{val.Nombre}</td>
                  <td>{val.Descripcion}</td>
                  <td>{val.CantidadEnStock}</td>
                  <td>{val.PrecioUnitario}</td>
                  <td>
                    <button>Editar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  );
}

export default App;
