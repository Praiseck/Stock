import React, { useState, useEffect } from "react";
import "./Productos.css";
import Axios from "axios";

const Productos = () => {
  const [ProductList, setProductList] = useState([]);
  const [CategoriaList, setCategoriaList] = useState([]);
  const [Nombre_producto, setNombre_producto] = useState("");
  const [CategoriaID, setCategoriaID] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Precio_unidad, setPrecio_unidad] = useState("");
  const [Cantidad_Stock, setCantidad_Stock] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/product/get").then((response) => {
      setProductList(response.data);
    });
    Axios.get("http://localhost:3001/category/get").then((response) => {
      setCategoriaList(response.data);
    });
  }, []);

  const submitProduct = () => {
    Axios.post("http://localhost:3001/product/insert", {
      Nombre: Nombre_producto,
      CategoriaID: CategoriaID,
      Descripcion: Descripcion,
      PrecioUnitario: Precio_unidad,
      CantidadEnStock: Cantidad_Stock,
    }).then(() => {
      Axios.get("http://localhost:3001/product/get").then((response) => {
        setProductList(response.data);
      });
      setNombre_producto("");
      setCategoriaID("");
      setDescripcion("");
      setPrecio_unidad("");
      setCantidad_Stock("");
    });
  };

  const updateProduct = () => {
    Axios.put(`http://localhost:3001/product/update/${selectedProductId}`, {
      Nombre: Nombre_producto,
      CategoriaID: CategoriaID,
      Descripcion: Descripcion,
      PrecioUnitario: Precio_unidad,
      CantidadEnStock: Cantidad_Stock,
    }).then(() => {
      Axios.get("http://localhost:3001/product/get").then((response) => {
        setProductList(response.data);
      });
      setNombre_producto("");
      setCategoriaID("");
      setDescripcion("");
      setPrecio_unidad("");
      setCantidad_Stock("");
      setSelectedProductId(null);
    });
  };

  const updateProducto = (id) => {
    const selectedProduct = ProductList.find(
      (product) => product.ProductoID === id
    );
    setNombre_producto(selectedProduct.Nombre);
    setCategoriaID(selectedProduct.CategoriaID);
    setDescripcion(selectedProduct.Descripcion);
    setPrecio_unidad(selectedProduct.PrecioUnitario);
    setCantidad_Stock(selectedProduct.CantidadEnStock);
    setSelectedProductId(id);
  };

  return (
    <div className="App-product">
      <div className="form">
        <label>Nombre</label>
        <input
          type="text"
          name="Nombre_producto"
          value={Nombre_producto}
          onChange={(n) => setNombre_producto(n.target.value)}
        />
        <label>Categoria</label>
        <select
          name="CategoriaID"
          value={CategoriaID}
          onChange={(e) => setCategoriaID(e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          {CategoriaList.map((categoria) => (
            <option key={categoria.CategoriaID} value={categoria.CategoriaID}>
              {categoria.NombreCategoria}
            </option>
          ))}
        </select>
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
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Producto ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Descripcion</th>
              <th>Precio Unitario</th>
              <th>Cantidad en Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ProductList.map((product) => {
              const category = CategoriaList.find(
                (categoria) => categoria.CategoriaID === product.CategoriaID
              );
              return (
                <tr key={product.ProductoID}>
                  <td>{product.ProductoID}</td>
                  <td>{product.Nombre}</td>
                  <td>{category ? category.NombreCategoria : ""}</td>
                  <td>{product.Descripcion}</td>
                  <td>{product.PrecioUnitario}</td>
                  <td>{product.CantidadEnStock}</td>
                  <td>
                    <button onClick={() => updateProducto(product.ProductoID)}>
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;
