import { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormProyecto from './FormProyecto'; 
import '../css/Login.css';

function Login() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [loginCorrecto, setLoginCorrecto] = useState(false);
  const [loginIncorrecto, setLoginIncorrecto] = useState(false);
  const [mostrarFormProyecto, setMostrarFormProyecto] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        nombre,
        email,
        contraseña,
      });

      console.log('Login successful', response.data);
      setLoginCorrecto(true);
      setMostrarFormProyecto(true);
      alert("Login correcto");
    } catch (error) {
      console.error('Login failed', error.response.data);
      setLoginIncorrecto(true);
      alert("Login incorrecto");
    }
  };

  if (mostrarFormProyecto) {
    // Si el login es correcto, mostrar el componente FormProyecto
    return <FormProyecto />;
  }

  return (
    <center>
      <h1 className="h1-login">Login Admin</h1>

      <div className="login-container">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"></link>

        <Form onSubmit={handleLogin}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Usuario"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Contraseña"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="password"
              onChange={(e) => setContraseña(e.target.value)}
              value={contraseña}
            />
          </InputGroup>

          <Button type="submit">Acceder</Button>{' '}
        </Form>
      </div>
    </center>
  );
}

export default Login;
