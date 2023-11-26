import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Table, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import './Crud.css' ;


export function Crud() {
    const baseURL = 'http://localhost:3010';

    const navigate = useNavigate();
    // objeto para almacenar la información del formulario
    const [formulario, setFormulario] = 
    useState({dni:'',nombre:'', apellido:'', nacionalidad:'', correoElectronico:'', fechaNacimiento:''});


    // datos de estudiantes
    const [datos, setDatos] = useState(null);
    
    useEffect(()=>{
        buscarEstudiantes();
    },[]); 

    const buscarEstudiantes = async () =>{
        axios.get(baseURL + '/api/v1/estudiante/estudiantes')
            .then( resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);
            })
            .catch( error => {
                console.log(error);
        })
    }

    const eliminarEstudiante = async (idEstudiante) =>{
        axios.delete(baseURL + '/api/v1/estudiante/estudiantes/' + idEstudiante)
            .then( resp => {
                console.log(resp.data.msj);

                buscarEstudiantes();
                alert(resp.data.msj);
            })
            .catch( error => {
                console.log(error);
        })
    }

    const enviarInformacion = async(e)=>{
        e.preventDefault();
        // console.log(formulario);
		// argumentos: direccion del servidor, datos enviados al servidor
        axios.post(baseURL + '/api/v1/estudiante/estudiantes',formulario)
        .then( res => {
            console.log(res);
            // alert(res.data.msj);
            setFormulario({
                dni:'', 
                nombre:'', 
                apellido:'', 
                correoElectronico:'', 
                nacionalidad:'',
                fechaNacimiento:''});
            buscarEstudiantes();
        })
        .catch( error=> {
            console.log('error ', error);
        });
    }


    const dashboard = () => {        
        navigate('/privado/dashboard');        
    };

    return (
        <>
            <div className='container mt-3 mb-2'>
                <div className='row'>
                    <div className="col-md-11">
                        <h1>Estudiantes</h1>
                    </div>                    
                    <div className="col-md-1">
                        <Button variant="info" onClick={dashboard}>Volver</Button>
                    </div>
                </div>
                <Card className='mt-3 mb-3'>
                    <Card.Body>
                        <Form onSubmit={e => enviarInformacion(e)}>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicdni">
                                        <Form.Label>DNI</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, dni:e.target.value })}
                                            value={formulario.dni} required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })}
                                            value={formulario.nombre} required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicApellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, apellido:e.target.value })}
                                            value={formulario.apellido} required/>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                                        <Form.Label>Nacionalidad</Form.Label>
                                        <Form.Select onChange={(e) => setFormulario({ ...formulario, nacionalidad:e.target.value })}>
                                            <option value="">Seleccione una opción</option>
                                            <option value="0">Argentino</option>
                                            <option value="1">Uruguayo</option>
                                            <option value="2">Chileno</option>
                                            <option value="3">Paraguayo</option>
                                            <option value="4">Brasilero</option>
                                            <option value="5">Boliviano</option>
                                        </Form.Select>                                    
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicCorreoElectronico">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(e) => setFormulario({ ...formulario, correoElectronico:e.target.value })}
                                            value={formulario.correoElectronico} required/>
                                    </Form.Group>
                                    
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formBasicFechaNacimiento">
                                        <Form.Label>Fecha Nacimiento</Form.Label>
                                        <Form.Control type="date"
                                            onChange={(e) => setFormulario({ ...formulario, fechaNacimiento:e.target.value })}
                                            value={formulario.fechaNacimiento} required/>
                                    </Form.Group>
                                    
                                </div>
                            </div>

                            <Button variant="primary" type="submit">
                                Crear
                            </Button>
                        </Form>  
                    </Card.Body>
                </Card>
            </div>

            <div className='container mt-1 mb-5 miTabla'>
                <Table striped bordered hover >
                    <thead >
                        <tr>
                            <th className='miThead'>Foto</th>
                            <th className='miThead'>Legajo</th>
                            <th className='miThead'>DNI</th>
                            <th className='miThead'>Apellido</th>
                            <th className='miThead'>Nombre</th>
                            <th className='miThead'>Nacionalidad</th>
                            <th className='miThead'>Correo Electrónico</th>
                            <th className='miThead'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>
                                        <img 
                                            className='foto'
                                            src={`http://localhost:3010/archivos/${item.foto}`} alt={item.foto}
                                        />
                                    </td>
                                    <td>{item.idEstudiante}</td>
                                    <td>{item.dni}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.nacionalidad}</td>
                                    <td>{item.correoElectronico}</td>
                                    <td>
                                        <Button variant="success" className='miBoton'>Editar</Button>
                                        <Button variant="danger" onClick={()=>eliminarEstudiante(item.idEstudiante)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))) 
                            : 
                            (
                                <tr>
                                    {/* TAREA: un mensaje o similar  */}
                                </tr>
                            )
                        }
                    </tbody>
                </Table> 
            </div>
        </>
    );
}