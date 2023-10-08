import React, { useState, useEffect } from 'react';
import Card from './components/card';
import Formulario from './components/form';

function App() {
  const [data, setData] = useState([]);
  let [data_empresa, EditEmpresa] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:3002/empresa')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error al cargar datos desde la API:', error));
  }, []);

  // const [mensaje, setMensaje] = useState('');
  const manejarMensaje = (mensaje, id) => {
    if(mensaje === 'editar'){
      data_empresa = getEmpresa(id)
    }
    if(mensaje === 'eliminar'){
      data_empresa = DeleteEmpresa(id)
    }
  };

  const getEmpresa = (id) =>{
      fetch('http://localhost:3002/getEmpresa?id='+id)
      .then(response => response.json())
      .then(data_empresa => EditEmpresa(data_empresa))
      .catch(error => console.error('Error al cargar datos desde la API:', error));
  }

  const DeleteEmpresa = (id) =>{
      fetch('http://localhost:3002/deleteEmpresa?id='+id)
      .then(response => response.json())
      .then(data_empresa => EditEmpresa(data_empresa))
      .catch(error => console.error('Error al cargar datos desde la API:', error));
  }

  return (
    <div className="App">
      <div className='section_info'>
        <div className='body_card'>
          {data.map((card, index) => (
            <Card key={card.id} image={card.imagen} descripcion={card.descripcion} historia={card.historia} fecha={card.fecha} nombre={card.nombre} onMensaje={(mensaje) => manejarMensaje(mensaje, card.id)} />
          ))}
        </div>
        <div className='body_form'>
          <Formulario data_empresa={data_empresa[0]} />
        </div>
      </div>
    </div>
  );
}

export default App;
