import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../UserContext/UserContext';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Estudiante.css' ;


export function Estudiante() {
    const baseURL = 'http://localhost:3010';

    const { userData, setUserData } = useContext(UserContext);
    // datos del usuario logueado
    // console.log(userData.token);

    const [archivo, setArchivo] = useState(null);
    const [datos, setDatos] = useState(null);
    const [estudiante, setEstudiante] = 
    useState({dni:'',
        nombre:'', 
        apellido:'',
        nacionalidad:'', 
        correoElectronico:'',
        fechaNacimiento:'', 
        celular:''});
    
    const [showModal, setShowModal] = useState(false);
    const cerrarModal = () => setShowModal(false);

    const changeArchivo = (e) => {        
        setArchivo(e.target.files[0]);
    };

    
    useEffect(()=>{
        buscarEstudiantes();
    },[]); 

    // para buscar la informacion de estudiantes le envio el token del usuario logueado
    const buscarEstudiantes = async () =>{
        axios.get(baseURL + '/api/v1/estudiante/estudiantes',{
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
        .then( resp => {
            console.log(resp.data.dato);
            setDatos(resp.data.dato);
        })
        .catch( error => {
            console.log(error);
        })
    }
    
    // para eliminar un estudiante le envio el token del usuario logueado
    const eliminarEstudiante = async (idEstudiante) =>{

        Swal.fire({
            title: '¿Estas seguro de eliminar el estudiante seleccionado?',
            showDenyButton: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(baseURL + '/api/v1/estudiante/estudiantes/' + idEstudiante, {
                    headers:{
                        Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                    }
                })
                .then( async resp => {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon:'success'});

                    if (result.isConfirmed){
                        buscarEstudiantes();   
                    } 
                })
                .catch( error => {
                    console.log(error);
                })              
            } 
        })

    }

    const enviarInformacion = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('dni', estudiante.dni);
        formData.append('nombre', estudiante.nombre);
        formData.append('apellido', estudiante.apellido);
        formData.append('fechaNacimiento', estudiante.fechaNacimiento);
        formData.append('nacionalidad', estudiante.nacionalidad);
        formData.append('correoElectronico', estudiante.correoElectronico);
        formData.append('celular', estudiante.celular);
        formData.append('foto', archivo);
        try {

                  
        const response = await axios.post(baseURL + '/api/v1/estudiante/estudiantes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            },
        });

        if(response.data.estado==='OK'){
            const result = await Swal.fire({
                text: response.data.msj,
                icon:'success'})

            if (result.isConfirmed){
                cerrarModal();
                buscarEstudiantes();
                setEstudiante({dni:'',
                    nombre:'', 
                    apellido:'',
                    nacionalidad:'', 
                    correoElectronico:'',
                    fechaNacimiento:'', 
                    celular:''}
                );    
            }  
            
        }
        } catch (error) {
        console.error('Error al crear un estudiante', error);
        }
    }

    // activa el modal y busca los rivales
    const verModal = () => {        
        setShowModal(true);
    };

    return (
        <>
            <div className='container mt-3 mb-2'>
                <div className='row'>
                    <div className="col-md-11">
                        <h1>Estudiantes</h1>
                    </div>                    
                    <div className="col-md-1">
                        <Button variant="primary" onClick={verModal}>Nuevo</Button>
                    </div>
                </div>
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


            <Modal show={showModal} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Esrudiante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => enviarInformacion(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicdni">
                                    <Form.Label>DNI</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, dni:e.target.value })}
                                        value={estudiante.dni} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, nombre:e.target.value })}
                                        value={estudiante.nombre} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, apellido:e.target.value })}
                                        value={estudiante.apellido} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicNacionalidad">
                                    <Form.Label>Nacionalidad</Form.Label>
                                    <Form.Select onChange={(e) => setEstudiante({ ...estudiante, nacionalidad:e.target.value })}>
                                        <option value="">Seleccionar</option>
                                        <option value="0">Argentino</option>
                                        <option value="1">Uruguayo</option>
                                        <option value="2">Chileno</option>
                                        <option value="3">Paraguayo</option>
                                        <option value="4">Brasilero</option>
                                        <option value="5">Boliviano</option>
                                    </Form.Select>                                    
                                </Form.Group>
                            </div>                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicFechaNacimiento">
                                    <Form.Label>Fecha Nacimiento</Form.Label>
                                    <Form.Control type="date"
                                        onChange={(e) => setEstudiante({ ...estudiante, fechaNacimiento:e.target.value })}
                                        value={estudiante.fechaNacimiento} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-8">
                                <Form.Group className="mb-3" controlId="formBasicCorreoElectronico">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, correoElectronico:e.target.value })}
                                        value={estudiante.correoElectronico} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicCelular">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(e) => setEstudiante({ ...estudiante, celular:e.target.value })}
                                        value={estudiante.celular} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <Form.Group className="mb-3" controlId="formBasicCelular">
                                    <Form.Label>Seleccionar Archivo:</Form.Label>
                                    <Form.Control type="file"                                                                            
                                        accept=".jpg, .jpeg, .png" // Define los tipos de archivo permitidos                                        
                                        onChange={changeArchivo}
                                    />
                                </Form.Group>
                            </div>                            
                        </div>

                        <Button variant="primary" type="submit">
                            Crear
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}