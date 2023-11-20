import './App.css';

function App() {
  return (
    <div className="App">
      <h1>PRODUCTOS</h1>
      <div className='form'>
        <label>Nombre</label>
        <input type="text" name="Nombre_producto" />
        <label>Descripcion</label>
        <input type="text" name="Descripcion" />
        <label>Precio Unidad</label>
        <input type="text" name="Precio_unidad" />
        <label>Cantidad en Stock</label>
        <input type="text" name="Cantidad_Stock" />

        <button>Ingresar</button>
      </div>
    </div>
  );
}

export default App;
