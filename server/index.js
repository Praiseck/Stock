const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Duke4931$',
    database: 'pos_system'
})

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO Producto (Nombre, Descripcion, PrecioUnitario, CantidadEnStock) VALUES ('Producto 1', 'Descripción del producto 1', 100.00, 10);"
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            res.status(500).send("Error al insertar en la base de datos");
        } else {
            console.log("Inserción exitosa:", result);
            res.send('Hello Monos');
        }
    });
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});