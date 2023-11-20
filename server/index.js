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


app.get('/api/get', (req, res) => {

    const sqlSelect = "SELECT * FROM Producto"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post('/api/insert', (req, res) => {

    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const PrecioUnitario = req.body.PrecioUnitario;
    const CantidadEnStock = req.body.CantidadEnStock;

    const sqlInsert = "INSERT INTO Producto (Nombre, Descripcion, PrecioUnitario, CantidadEnStock) VALUES (?,?,?,?);"
    db.query(sqlInsert, [Nombre, Descripcion, PrecioUnitario, CantidadEnStock], (err, result) => {

    })
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});