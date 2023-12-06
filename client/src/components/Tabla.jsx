// Componente Tabla
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../css/Tabla.css';

function Tabla({proyecto, editarProyecto, updateProyecto, eliminarProyecto}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const openEditModal = (user) => {
    setUserToEdit(user);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const handleSave = (updatedProyecto) => {
    updateProyecto(updatedProyecto);
    closeModal();
  };

  const handleDelete = (id) => {
    eliminarProyecto(id);
  };

  // Renderizado 
  return (
    <>
    <div className="container-principal">
      <Table className= 'table-bordered'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Link</th>
            <th>Descripción</th>
            <th>Editar / Eliminar</th>
          </tr>
        </thead>
        <tbody className="tabla-container">
          {proyecto.map(proyecto => (
              <tr key={proyecto.id}>
              <td>{proyecto.nombre_proyecto}</td>
              <td>{proyecto.descripcion}</td>
              <td>{proyecto.link}</td> 
              <td className='buttons-td'> 
                <Button className='btn-primary' onClick={() => openEditModal(proyecto)}>Editar</Button>
                <Button className='btn-danger' onClick={() => handleDelete(proyecto.id)}>Eliminar</Button>
              </td> 
              </tr>
          ))}
        </tbody>
      </Table>
    </div>  
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header>
          Editar Proyecto
        </Modal.Header>
        
        <Modal.Body>
        <EditUserForm
            user={userToEdit}
            onClose={handleSave}
            updateProyecto={updateProyecto}
          />
        </Modal.Body>
      </Modal>
    </>
  )

}

export function EditUserForm({ user, onClose, updateProyecto}) {
  const [formData, setFormData] = useState({
    nombre_proyecto: user && user.nombre_proyecto ? user.nombre_proyecto : '',
    descripcion: user && user.descripcion ? user.descripcion : '',
    link: user && user.link ? user.link : '',
    id: user && user.id ? user.id : '',
  });

  console.log(formData);  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (updatedProyecto) => {
    try {
      const response = await fetch(`http://localhost:3001/update/${updatedProyecto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProyecto),
      });
  
      if (response.ok) {
        console.log('Proyecto actualizado correctamente');
        updateProyecto(updatedProyecto); 
        onClose(); 
      } else {
        console.error('Error al actualizar el proyecto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  const handleCancel = () => {
    onClose(); // Cierra el modal al hacer clic en "Cancelar"
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre_proyecto"
          value={formData.nombre_proyecto}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicApellido">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEdad">
        <Form.Label>link</Form.Label>
        <Form.Control
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
      </Form.Group>

      <center>

        <Button className="btn-info" onClick={() => handleSave(formData)}>
          Guardar
        </Button>
        
        <Button className="btn-danger" onClick={handleCancel}>
          Cancelar
        </Button>

      </center>
    </Form>
  );
}

export default Tabla;