import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../UserContext/UserContext';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './EstudianteCarrera.css' ;


export function EstudianteCarrera() {
    const baseURL = 'http://localhost:3010';

    const { userData, setUserData } = useContext(UserContext);

    const [datos, setDatos] = useState(null);
    const [estudianteCarrera, setEstudianteCarrera] = 
    useState({nombre:'',
        apellido:'',
        nombreCarrera:'',
        fechaAlta:'',
        modalidad:'', 
        });
    
    const [showModal, setShowModal] = useState(false);
    const cerrarModal = () => setShowModal(false);

    useEffect(()=>{
        buscarEstudianteCarreras();
    },[]); 

    const buscarEstudianteCarreras = async () =>{
        axios.get(baseURL + '/api/v1/estudiantecarrera/estudiantesCarreras',{
            headers:{
                Authorization:`Bearer ${userData.token}` 
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
    
    const eliminarEstudianteCarrera = async (idEstudianteCarrera) =>{

        Swal.fire({
            title: '¿Estas seguro de eliminar el estudiante de la carrera seleccionada?',
            showDenyButton: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(baseURL + '/api/v1/estudiantecarrera/estudiantesCarreras' + idEstudianteCarrera, {
                    headers:{
                        Authorization:`Bearer ${userData.token}`
                    }
                })
                .then( async resp => {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon:'success'});

                    if (result.isConfirmed){
                        buscarEstudianteCarreras();   
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
        formData.append('nombre', estudianteCarrera.nombre);
        formData.append('apellido', estudianteCarrera.apellido);
        formData.append('nombreCarrera', estudianteCarrera.nombreCarrera);
        formData.append('fechaAlta', estudianteCarrera.fechaAlta);
        formData.append('modalidad', estudianteCarrera.modalidad);
        try {

                  
        const response = await axios.post(baseURL + '/api/v1/estudiantecarrera/estudiantesCarreras', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userData.token}` 
            },
        });

        if(response.data.estado==='OK'){
            const result = await Swal.fire({
                text: response.data.msj,
                icon:'success'})

            if (result.isConfirmed){
                cerrarModal();
                buscarEstudianteCarreras();
                setEstudianteCarrera({nombre:'',
                apellido:'',
                nombreCarrera:'',
                fechaAlta:'',
                modalidad:'', 
                });;   
            }  
            
        }
        } catch (error) {
        console.error('Error al inscribir un estudiante en una carrera', error);
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
                        <h1>Estudiantes Carreras</h1>
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
                            <th className='miThead'>Nombre</th>
                            <th className='miThead'>Apellido</th>
                            <th className='miThead'>Nombre Carrera</th>
                            <th className='miThead'>Fecha Alta</th>
                            <th className='miThead'>Modalidad</th>
                            <th className='miThead'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.nombreCarrera}</td>
                                    <td>{item.fechaAlta}</td>
                                    <td>{item.modalidad}</td>
                                    <td>
                                        <Button variant="success" className='miBoton'>Editar</Button>
                                        <Button variant="danger" onClick={()=>eliminarEstudianteCarrera(item.idEstudianteCarrera)}>Eliminar</Button>
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
                    <Modal.Title>Nuevo Estudiante Carrera</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={m => enviarInformacion(m)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteCarrera({ ...estudianteCarrera, nombre:m.target.value })}
                                        value={estudianteCarrera.nombre} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteCarrera({ ...estudianteCarrera, apellido:m.target.value })}
                                        value={estudianteCarrera.apellido} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>                            
                            <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="formBasicNombreCarrera">
                                        <Form.Label>Nombre Carrera</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(m) => setEstudianteCarrera({ ...estudianteCarrera, nombreCarrera:m.target.value })}
                                            value={estudianteCarrera.nombreCarrera} required/>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicFechaAlta">
                                    <Form.Label>Fecha Alta</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteCarrera({ ...estudianteCarrera, fechaAlta:m.target.value })}
                                        value={estudianteCarrera.fechaAlta} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicModalidad">
                                    <Form.Label>Modalidad</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteCarrera({ ...estudianteCarrera, modalidad:m.target.value })}
                                        value={estudianteCarrera.modalidad} required/>
                                </Form.Group>
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