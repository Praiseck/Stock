const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Duke4931$",
  database: "pos_system",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/product/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Producto";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/users/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Usuario";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/category/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Categoria";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/rol/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Rol";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/product/insert", (req, res) => {
  const Nombre = req.body.Nombre;
  const CategoriaID = req.body.CategoriaID;
  const Descripcion = req.body.Descripcion;
  const PrecioUnitario = req.body.PrecioUnitario;
  const CantidadEnStock = req.body.CantidadEnStock;

  const sqlInsert =
    "INSERT INTO Producto (Nombre, CategoriaID, Descripcion, PrecioUnitario, CantidadEnStock) VALUES (?,?,?,?,?);";

  db.query(
    sqlInsert,
    [Nombre, CategoriaID, Descripcion, PrecioUnitario, CantidadEnStock],
    (err, result) => {}
  );
});

app.post("/users/insert", (req, res) => {
  const Nombre = req.body.Nombre;
  const Apellido = req.body.Apellido;
  const Email = req.body.Email;
  const Contrasena = req.body.Contrasena;
  const RolID = req.body.RolID;

  const sqlInsert =
    "INSERT INTO Usuario (Nombre, Apellido, Email, Contrasena, RolID) VALUES (?,?,?,?,?)";
  db.query(
    sqlInsert,
    [Nombre, Apellido, Email, Contrasena, RolID],
    (err, result) => {}
  );
});

app.put("/product/update/:id", (req, res) => {
  const ProductoID = req.params.id;
  const { Nombre, CategoriaID, Descripcion, PrecioUnitario, CantidadEnStock } =
    req.body;

  const sqlUpdate =
    "UPDATE Producto SET Nombre=?, CategoriaID=?, Descripcion=?, PrecioUnitario=?, CantidadEnStock=? WHERE ProductoID=?";

  db.query(
    sqlUpdate,
    [
      Nombre,
      CategoriaID,
      Descripcion,
      PrecioUnitario,
      CantidadEnStock,
      ProductoID,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error al actualizar el producto");
      } else {
        res.status(200).send("Producto actualizado exitosamente");
      }
    }
  );
});

app.put("/users/update/:id", (req, res) => {
  const UsuarioID = req.params.id;
  const { Nombre, Apellido, Email, Contrasena, RolID } = req.body;

  const sqlUpdate =
    "UPDATE Usuario SET Nombre=?, Apellido=?, Email=?, Contrasena=?, RolID=? WHERE UsuarioID=?";
  db.query(
    sqlUpdate,
    [Nombre, Apellido, Email, Contrasena, RolID, UsuarioID],
    (err, result) => {
      if (err) {
        console.log("Error al actualizar el Usuario");
      } else {
        console.log("Usuario actualizado exitosamente");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
