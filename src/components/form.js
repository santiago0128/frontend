import React, {useState, useEffect} from 'react';

const FormularioContacto = (dataempresa) => {

    let [nombre, setNombre] = useState('');
    let [descripcion, setDescripcion] = useState('');
    let [historia, setHistoria] = useState('');
    let [fecha, setFecha] = useState('');
    let [file, setFile] = useState('');
    let [id, setId] = useState('');
 


    useEffect(() => {
        if (dataempresa.data_empresa) {
          setNombre(dataempresa.data_empresa.nombre);
          setDescripcion(dataempresa.data_empresa.descripcion);
          setFecha(new Date(dataempresa.data_empresa.fecha).toISOString().split('T')[0]);
          setHistoria(dataempresa.data_empresa.historia);
          setId(dataempresa.data_empresa.id);
        }
    }, [dataempresa.data_empresa]);
    

    const agregar = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        let data = {
            'nombre': nombre,
            'descripcion': descripcion,
            'fecha': fecha,
            'historia': historia,
            'imagen': file.name,
        }
        fetch('http://localhost:3002/addempresa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido según tus necesidades
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error('Error al cargar datos desde la API:', error));
        fetch('http://localhost:3002/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error('Error al cargar datos desde la API:', error));

       
        setNombre('');
        setDescripcion('');
        setFecha('');
        setHistoria('');
    };

    const editar = (e) => {
        e.preventDefault();

        let data = {
            'nombre': nombre,
            'descripcion': descripcion,
            'fecha': fecha,
            'historia': historia,
            'imagen': file.name,
            'id': id,
        }
        fetch('http://localhost:3002/editempresa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido según tus necesidades
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error('Error al cargar datos desde la API:', error));

        setNombre('');
        setDescripcion('');
        setFecha('');
        setHistoria('');
    };

    return (
        <div>
            <h2>Formulario de Empresas</h2>
            <form>
                <div>
                    <label htmlFor="nombre">Imagen:</label>
                    <input className='input_form' type="file" id="file"   onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input className='input_form' type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Descripción:</label>
                    <input className='input_form' type="email" id="email" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="mensaje">Fecha:</label>
                    <input className='input_form' type='date' name='fecha' value={fecha}  id='fecha' onChange={(e) => setFecha(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="mensaje">Historia:</label>
                    <textarea style={{ width: '350px', height: '150px' }} value={historia} className='input_form' id="mensaje" onChange={(e) => setHistoria(e.target.value)} />
                    <input className='input_form' type='hidden'  value={id}  id='fecha' onChange={(e) => setId(e.target.value)} />
                </div>
                <br />
                {dataempresa.data_empresa ? (
                    <button type='button' onClick={editar} className='btn_editar'>Editar</button>
                ) : (
                    <button type='button' onClick={agregar} className='btn_editar'>Agregar</button>
                )
                }
            </form>
        </div>
    );
};

export default FormularioContacto;