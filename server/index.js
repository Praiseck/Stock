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

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
 
  db.query('SELECT * FROM Usuario WHERE Nombre = ? AND Contrasena = ?', [username, password], (err, result) => {
     if (err) throw err;
 
     if (result.length > 0) {
       res.send({ success: true, message: 'Inicio de sesión exitoso.' });
     } else {
       res.send({ success: false, message: 'Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.' });
     }
  });
 });

//Hace la peticion a la base de datos para conseguir los Productos
app.get("/product/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Producto";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//Hace la peticion a la base de datos para conseguir los Usuarios
app.get("/users/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Usuario";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//Hace la peticion a la base de datos para conseguir las Categorias de Productos
app.get("/category/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Categoria";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//Hace la peticion a la base de datos para conseguir los roles de los usuarios
app.get("/rol/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Rol";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//Hace la peticion a la base de datos para conseguir los Proveedores
app.get("/proveedores/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Proveedor";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//Captura la informacion enviada de productos y la ingresa en la base de datos
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
    (err, result) => {
      if (err) {
        res.status(500).send("Error al insertar el producto");
      } else {
        res.status(200).send("Producto insertado exitosamente");
      }
    }
  );
});

//Captura la informacion enviada de usuarios y la ingresa en la base de datos
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
    (err, result) => {
      if (err) {
        res.status(500).send("Error al insertar el producto");
      } else {
        res.status(200).send("Producto insertado exitosamente");
      }
    }
  );
});

//Captura la informacion enviada de proveedores y la ingresa en la base de datos
app.post("/proveedores/insert", (req, res) => {
  const Nombre = req.body.Nombre;
  const Direccion = req.body.Direccion;
  const Telefono = req.body.Telefono;
  const Email = req.body.Email;
  const sqlInsert =
    "INSERT INTO Proveedor (Nombre, Direccion, Telefono, Email) VALUES (?,?,?,?)";
  db.query(sqlInsert, [Nombre, Direccion, Telefono, Email], (err, result) => {
    if (err) {
      res.status(500).send("Error al insertar el proveedor");
    } else {
      res.status(200).send("Proveedor insertado exitosamente");
    }
  });
});

//Captura la actualizacion de datos y le hace update a la base de datos
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

//Captura la actualizacion de datos y le hace update a la base de datos
app.put("/users/update/:id", async (req, res) => {
  try {
    const UsuarioID = req.params.id;
    const { Nombre, Apellido, Email, Contrasena, RolID } = req.body;

    const sqlUpdate =
      "UPDATE Usuario SET Nombre=?, Apellido=?, Email=?, Contrasena=?, RolID=? WHERE UsuarioID=?";
    db.query(sqlUpdate, [
      Nombre,
      Apellido,
      Email,
      Contrasena,
      RolID,
      UsuarioID,
    ]);

    console.log("Usuario actualizado exitosamente");
    res.status(200).send("Usuario actualizado exitosamente");
  } catch (err) {
    console.log("Error al actualizar el Usuario: ", err);
    res.status(500).send("Error al actualizar el Usuario");
  }
});

app.put("/proveedores/update/:id", async (req, res) => {
  try {
    const ProveedorID = req.params.id;
    const { Nombre, Direccion, Telefono, Email } = req.body;
    const sqlUpdate =
      "UPDATE Proveedor SET Nombre=?, Direccion=?, Telefono=?, Email=? WHERE ProveedorID=?";
    db.query(sqlUpdate, [Nombre, Direccion, Telefono, Email, ProveedorID]);
    console.log("Proveedor actualizado exitosamente");
    res.status(200).send("Proveedor actualizado exitosamente");
  } catch (err) {
    console.log("Error al actualizar el Proveedor: ", err);
    res.status(500).send("Error al actualizar el Proveedor");
  }
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
