import React from 'react';
import '../App.css';

const Card = ({ image, descripcion, historia, fecha, nombre, onMensaje }) => {

  const fecha_format = new Date(fecha);

  // Obtiene el día, mes y año
  const dia = fecha_format.getDate();
  const mes = fecha_format.toLocaleString('default', { month: 'long' });
  const año = fecha_format.getFullYear();
  const fechaFormateada = `${mes} ${dia}, ${año}`;

  const onEdit = () => {
    onMensaje('editar')
  };
  const onDelete = () => {
    onMensaje('eliminar')
  };


  return (
    <div className="card">
      <div className='header_image'>
        <img src={`http://localhost:3002/uploads/${image}`} alt="Descripción de la imagen" />
      </div>
      <div className="card-body">
        <h2 className="card-title">{nombre}</h2>
        <p><b>{descripcion}</b></p>
        <p><b>{historia}</b></p>
        <p><b>{fechaFormateada}</b></p>
      </div>
      <button className='btn_editar' onClick={onEdit}>Editar</button>
      <br />
      <br />
      <button className='btn_eliminar' onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default Card;
