const app = express();
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,    
}

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',    
    database:'portafolio',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Conexión exitosa');
  }
});

app.get('/proyectos', (req, res) =>{
  db.query('SELECT * FROM proyectos',
  (err, result) => {
      if(err){
          console.error(err);
          res.status(500).send(err);
          return;
      }
  res.send(result);
});});

app.post('/login', (req, res) => {
  const { nombre, email, contraseña } = req.body;

  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ error: 'Información faltante' });
  }

  const query = 'SELECT * FROM usuario WHERE nombre = ? AND email = ? AND contraseña = ?';
  db.query(query, [nombre, email, contraseña], (err, results) => {
    if (err) {
      console.error('Login query failed:', err.message);
      res.status(500).json({ error: 'Conexión fallida' });
    } else {
      if (results.length === 1) {
        res.status(200).json({ message: 'Login correcto' });
      } else {
        res.status(401).json({ error: 'Credenciales invalidas' });
      }
    }
  });
});

app.listen(3001,()=>{
    console.log('Corriendo en el puerto 3001');
})

app.post('/create',(req,res)=>{
  const nombre_proyecto=req.body.nombre_proyecto;
  const descripcion=req.body.descripcion;
  const link=req.body.link;

  db.query 
    ('INSERT INTO proyectos (nombre_proyecto, descripcion, link) VALUES (?,?,?)',
    [nombre_proyecto, descripcion, link] , (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }

        res.send('Proyecto agregado');
    });
});

app.put('/update/:id', (req, res) => {
  const { nombre_proyecto, descripcion, link } = req.body;
  const id = req.params.id;

  console.log('Recibidos en /update:', req.body);

  db.query(
    'UPDATE proyectos SET nombre_proyecto=?, descripcion=?, link=? WHERE id=?',
    [nombre_proyecto, descripcion, link, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      } else if (result.affectedRows > 0) {
        console.log(result);
        res.send('Proyecto actualizado');
      } else {
        res.status(404).send('Proyecto no encontrado');
      }
    }
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM proyectos WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error(err); 
      res.status(500).send(err);
      return;
    } else if (result.affectedRows > 0) {
      res.send('Proyecto eliminado correctamente');
    } else {
      res.status(404).send('Proyecto no encontrado');
    }
  });
});