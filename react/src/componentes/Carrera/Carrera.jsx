import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../UserContext/UserContext';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Carrera.css' ;


export function Carrera() {
    const baseURL = 'http://localhost:3010';

    const { userData, setUserData } = useContext(UserContext);

    const [datos, setDatos] = useState(null);
    const [carrera, setCarrera] = 
    useState({nombreCarrera:'', 
        modalidad:''
        });
    
    const [showModal, setShowModal] = useState(false);
    const cerrarModal = () => setShowModal(false);

    useEffect(()=>{
        buscarCarreras();
    },[]); 

    // para buscar la informacion de materias le envio el token del usuario logueado
    const buscarCarreras = async () =>{
        axios.get(baseURL + '/api/v1/carrera/carreras',{
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
    const eliminarCarrera = async (idCarrera) =>{

        Swal.fire({
            title: '¿Estas seguro de eliminar la carrera seleccionada?',
            showDenyButton: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(baseURL + '/api/v1/carrera/carreras' + idCarrera, {
                    headers:{
                        Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                    }
                })
                .then( async resp => {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon:'success'});

                    if (result.isConfirmed){
                        buscarCarreras();   
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
        formData.append('nombreCarrera', carrera.nombreCarrera);
        formData.append('modalidad', carrera.modalidad);
        try {
            
        const response = await axios.post(baseURL + '/api/v1/carrera/carreras', formData, {
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
                buscarCarreras();
                setCarrera({nombreCarrera:'',
                modalidad:'',
                });    
            }  
            
        }
        } catch (error) {
        console.error('Error al crear una carrera', error);
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
                        <h1>Carreras</h1>
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
                            <th className='miThead'>Modalidad</th>
                            <th className='miThead'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>{item.nombreCarrera}</td>
                                    <td>{item.modalidad}</td>
                                    <td>
                                        <Button variant="success" className='miBoton'>Editar</Button>
                                        <Button variant="danger" onClick={()=>eliminarCarrera(item.idCarrera)}>Eliminar</Button>
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
                    <Modal.Title>Nueva Carrera</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={c => enviarInformacion(c)}>
                        <div className='row'>                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(c) => setCarrera({ ...carrera, nombreCarrera:c.target.value })}
                                        value={carrera.nombreCarrera} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicModalidad">
                                    <Form.Label>Modalidad</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(c) => setCarrera({ ...carrera, modalidad:c.target.value })}
                                        value={carrera.modalidad} required/>
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