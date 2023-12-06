import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/Proyectos.css'; 
import NavBar from "./Nav";

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/proyectos')
      .then(response => {
        setProyectos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="proyecto-container">
        <>
        <div className="h1-container"><h1>Proyectos</h1></div>
          <div className="texto-container">
            {proyectos.map((proyecto) => (
              <div key={proyecto.id}>
                <h2>{proyecto.nombre_proyecto}</h2>
                <p>{proyecto.descripcion}</p>
                <a className="link" href={proyecto.link}>{proyecto.link}</a>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
}

export default Proyectos;
