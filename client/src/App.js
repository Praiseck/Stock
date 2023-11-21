import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [Nombre_producto, setNombre_producto] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio_unidad, setPrecio_unidad] = useState("");
  const [Cantidad_Stock, setCantidad_Stock] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null); // Estado para almacenar el ID del producto seleccionado

  useEffect(() => {
    Axios.get("http://localhost:3001/product/get").then((response) => {
      setProductList(response.data);
    });
  }, []);

  const submitProduct = () => {
    Axios.post("http://localhost:3001/product/insert", {
      Nombre: Nombre_producto,
      Descripcion: Descripcion,
      PrecioUnitario: Precio_unidad,
      CantidadEnStock: Cantidad_Stock,
    }).then(() => {
      Axios.get("http://localhost:3001/product/get").then((response) => {
        setProductList(response.data);
      });
      setNombre_producto("");
      setDescripcion("");
      setPrecio_unidad("");
      setCantidad_Stock("");
    });
  };

  const updateProduct = () => {
    Axios.put(`http://localhost:3001/product/update/${selectedProductId}`, {
      Nombre: Nombre_producto,
      Descripcion: Descripcion,
      PrecioUnitario: Precio_unidad,
      CantidadEnStock: Cantidad_Stock,
    }).then(() => {
      Axios.get("http://localhost:3001/product/get").then((response) => {
        setProductList(response.data);
      });
      setNombre_producto("");
      setDescripcion("");
      setPrecio_unidad("");
      setCantidad_Stock("");
      setSelectedProductId(null);
    });
  };

  const updateProducto = (id) => {
    const selectedProduct = ProductList.find((product) => product.ProductoID === id);
    setNombre_producto(selectedProduct.Nombre);
    setDescripcion(selectedProduct.Descripcion);
    setPrecio_unidad(selectedProduct.PrecioUnitario);
    setCantidad_Stock(selectedProduct.CantidadEnStock);
    setSelectedProductId(id);
  };

  return (
    <div className="App">
      <h1>PRODUCTOS</h1>
      <div className="form">
        <label>Nombre</label>
        <input
          type="text"
          name="Nombre_producto"
          value={Nombre_producto}
          onChange={(n) => setNombre_producto(n.target.value)}
        />
        <label>Descripcion</label>
        <input
          type="text"
          name="Descripcion"
          value={Descripcion}
          onChange={(d) => setDescripcion(d.target.value)}
        />
        <label>Precio Unidad</label>
        <input
          type="text"
          name="Precio_unidad"
          value={Precio_unidad}
          onChange={(p) => setPrecio_unidad(p.target.value)}
        />
        <label>Cantidad en Stock</label>
        <input
          type="text"
          name="Cantidad_Stock"
          value={Cantidad_Stock}
          onChange={(s) => setCantidad_Stock(s.target.value)}
        />

        <button onClick={selectedProductId ? updateProduct : submitProduct}>
          {selectedProductId ? "Actualizar" : "Ingresar"}
        </button>
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
              <tr key={val.ProductoID}>
                <td>{val.ProductoID}</td>
                <td>{val.Nombre}</td>
                <td>{val.Descripcion}</td>
                <td>{val.CantidadEnStock}</td>
                <td>{val.PrecioUnitario}</td>
                <td>
                  <button onClick={() => updateProducto(val.ProductoID)}>Editar</button>
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
