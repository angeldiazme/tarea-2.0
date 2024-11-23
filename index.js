//Integrantes
//Luis Enrique Cruz Gamez 202210010814
//German Alexander Villanueva Guzman 201320010240
//Owen Javier Orellana Hernández 202010011089
//Luis Enrique Cruz Gamez 202210010814
//Miguel Angel Diaz Mejia 202110010425

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT= 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empresa'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

app.get('/',(req,res)=>{
res.send('welcome to my api')
})


// Crear
app.post('/api/crear', (req, res) => {
  const { nombre, fecha_nacimiento, cedula,telefono,direccion } = req.body;
  const query = 'INSERT INTO empleados (nombre,fecha_nacimiento, cedula, telefono, direccion) VALUES (?,?,?,?,?)';
  db.query(query, [ nombre, fecha_nacimiento, cedula,telefono,direccion], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send(result);
  });
});

// Leer
app.get('/api/lista', (req, res) => {
  const query = 'SELECT * FROM empleados';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(results);
  });
});

// Actualizar
app.put('/api/actualizar/:id', (req, res) => {
  const { id } = req.params;
  const {  nombre, fecha_nacimiento, cedula,telefono,direccion } = req.body;
  const query = 'UPDATE empleados SET nombre=?,fecha_nacimiento=?,cedula=?,telefono=?,direccion=? WHERE id=?';
  db.query(query, [ nombre, fecha_nacimiento, cedula,telefono,direccion, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(result);
  });
});

// Eliminar
app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM empleados WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(result);
  });
});

//const  = process.env.PORT || 3306;
app.listen(PORT, () => {
 console.log(`Servidor corriendo en http://localhost:${PORT}`);
});