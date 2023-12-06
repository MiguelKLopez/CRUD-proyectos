import React from 'react';
import { BrowserRouter, Routes ,Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Proyectos from './components/Proyectos';
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">

        <center>
          <Routes>
            <Route path="/" element={<Proyectos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/proyectos" element={<Proyectos />} />
          </Routes>
        </center>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
