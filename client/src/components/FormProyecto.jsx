import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Nav";
import Proyectos from "./Proyectos";
import Tabla from "./Tabla";
import '../css/FormProyecto.css';

function FormProyecto() {
  const [proyecto, setProyecto] = useState([]);
  const [id, setId] = useState("");
  const [nombre_proyecto, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [link, setLink] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    getProyectos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre_proyecto") {
      setNombre(value);
    } else if (name === "descripcion") {
      setDescripcion(value);
    } else if (name === "link") {
      setLink(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      updateProyecto();
    } else {
      createProyecto();
    }
  };

  const createProyecto = () => {
    axios.post("http://localhost:3001/create", 
    { nombre_proyecto, descripcion, link })
      .then(() => {
        alert('Proyecto registrado');
        getProyectos();
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProyecto = () => {
    axios.put(`http://localhost:3001/update/${id}`, 
    { nombre_proyecto, descripcion, link })
      .then((response) => {
        alert('Proyecto actualizado');
        getProyectos();
        setModoEdicion(false);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const eliminarProyecto = (proyectoId) => {
    axios.delete(`http://localhost:3001/delete/${proyectoId}`)
      .then((response) => {
        alert(response.data);
        getProyectos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setNombre("");
    setDescripcion("");
    setLink("");
    setId("");
  };

  const editarProyecto = (proyecto) => {
    setModoEdicion(true);
    setId(proyecto.id);
    setNombre(proyecto.nombre_proyecto);
    setDescripcion(proyecto.descripcion);
    setLink(proyecto.link);
  };

  const getProyectos = () => {
    axios.get('http://localhost:3001/proyectos')
      .then(response => {
        setProyecto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  return (
    <div>
      <NavBar />
      <h1>Formulario</h1>
      <center>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="nombre_proyecto" onChange={handleChange} value={nombre_proyecto} placeholder="Nombre del Proyecto"/>
            <br />
            <br />
          <input type="text" name="link" onChange={handleChange} value={link} placeholder="Link"/>
            <br />
            <br />
          <input className="long-text" type="text" name="descripcion" onChange={handleChange} value={descripcion} placeholder="Descripción"/>
            <br />
            <br />

          <button className="button-enviar" type="submit">
            {modoEdicion ? 'Actualizar' : 'Registrar'}
          </button>

          {modoEdicion && (
            <button className="button-cancelar" onClick={() => setModoEdicion(false)}>
              Cancelar Edición
            </button>
          )}
        </form>
      </center>

      <Tabla 
        proyecto={proyecto}
        eliminarProyecto={eliminarProyecto} 
        editarProyecto={editarProyecto}
        updateProyecto={updateProyecto}      
      />

      <Proyectos 
        nombre={nombre_proyecto}
        descripcion={descripcion}
        link={link}
      />

    </div>
  );
}

export default FormProyecto;

