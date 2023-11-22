const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Duke4931$',
    database: 'pos_system'
})

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))


app.get('/product/get', (req, res) => {
    const sqlSelect = "SELECT * FROM Producto"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.get('/category/get', (req, res) => {
  const sqlSelect = "SELECT * FROM Categoria"
  db.query(sqlSelect, (err, result) => {
      res.send(result);
  })
});

app.post('/product/insert', (req, res) => {

    const Nombre = req.body.Nombre;
    const CategoriaID = req.body.CategoriaID;
    const Descripcion = req.body.Descripcion;
    const PrecioUnitario = req.body.PrecioUnitario;
    const CantidadEnStock = req.body.CantidadEnStock;

    const sqlInsert = "INSERT INTO Producto (Nombre, CategoriaID, Descripcion, PrecioUnitario, CantidadEnStock) VALUES (?,?,?,?,?);"

    db.query(sqlInsert, [Nombre, CategoriaID, Descripcion, PrecioUnitario, CantidadEnStock], (err, result) => {
    })
});

app.put('/product/update/:id', (req, res) => {
    const ProductoID = req.params.id;
    const { Nombre, CategoriaID, Descripcion, PrecioUnitario, CantidadEnStock } = req.body;
  
    const sqlUpdate = "UPDATE Producto SET Nombre=?, CategoriaID=?, Descripcion=?, PrecioUnitario=?, CantidadEnStock=? WHERE ProductoID=?";
  
    db.query(sqlUpdate, [Nombre, CategoriaID,Descripcion, PrecioUnitario, CantidadEnStock, ProductoID], (err, result) => {
      if (err) {
        res.status(500).send("Error al actualizar el producto");
      } else {
        res.status(200).send("Producto actualizado exitosamente");
      }
    });
  });
  

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});