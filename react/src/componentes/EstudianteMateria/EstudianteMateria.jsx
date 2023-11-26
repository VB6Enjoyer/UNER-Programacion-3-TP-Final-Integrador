import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../UserContext/UserContext';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './EstudianteMateria.css' ;


export function EstudianteMateria() {
    const baseURL = 'http://localhost:3010';

    const { userData, setUserData } = useContext(UserContext);

    const [datos, setDatos] = useState(null);
    const [estudianteMateria, setEstudianteMateria] = 
    useState({nombre:'',
        apellido:'',
        horasSemanales:'', 
        nombreMateria:'',
        fecha:'', 
        });
    
    const [showModal, setShowModal] = useState(false);
    const cerrarModal = () => setShowModal(false);

    useEffect(()=>{
        buscarEstudianteMaterias();
    },[]); 

    // para buscar la informacion de materias le envio el token del usuario logueado
    const buscarEstudianteMaterias = async () =>{
        axios.get(baseURL + '/api/v1/estudiantemateria/estudiantesmaterias',{
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
    const eliminarEstudianteMateria = async (idEstudianteMateria) =>{

        Swal.fire({
            title: '¿Estas seguro de eliminar el estudiante de la materia seleccionada?',
            showDenyButton: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(baseURL + '/api/v1/estudiantemateria/estudiantesmaterias' + idEstudianteMateria, {
                    headers:{
                        Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                    }
                })
                .then( async resp => {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon:'success'});

                    if (result.isConfirmed){
                        buscarEstudianteMaterias();   
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
        formData.append('nombre', estudianteMateria.nombre);
        formData.append('apellido', estudianteMateria.apellido);
        formData.append('horasSemanales', estudianteMateria.horasSemanales);
        formData.append('nombreMateria', estudianteMateria.nombreMateria);
        formData.append('fecha', estudianteMateria.fecha);
        try {

                  
        const response = await axios.post(baseURL + '/api/v1/estudiantemateria/estudiantesmaterias', formData, {
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
                buscarEstudianteMaterias();
                setEstudianteMateria({nombre:'',
                apellido:'',
                horasSemanales:'', 
                nombreMateria:'',
                fecha:'', 
                });   
            }  
            
        }
        } catch (error) {
        console.error('Error al inscribir un estudiante en una materia', error);
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
                        <h1>Estudiantes Materias</h1>
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
                            <th className='miThead'>Horas Semanales</th>
                            <th className='miThead'>Materia</th>
                            <th className='miThead'>Fecha</th>
                            <th className='miThead'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.horasSemanales}</td>
                                    <td>{item.nombreMateria}</td>
                                    <td>{item.fecha}</td>
                                    <td>
                                        <Button variant="success" className='miBoton'>Editar</Button>
                                        <Button variant="danger" onClick={()=>eliminarEstudianteMateria(item.idEstudianteMateria)}>Eliminar</Button>
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
                    <Modal.Title>Nuevo Estudiante Materia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={m => enviarInformacion(m)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteMateria({ ...estudianteMateria, nombre:m.target.value })}
                                        value={estudianteMateria.nombre} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteMateria({ ...estudianteMateria, apellido:m.target.value })}
                                        value={estudianteMateria.apellido} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>                            
                            <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="formBasicHoras">
                                        <Form.Label>Horas Semenales</Form.Label>
                                        <Form.Control type="text"
                                            onChange={(m) => setEstudianteMateria({ ...estudianteMateria, horasSemanales:m.target.value })}
                                            value={estudianteMateria.horasSemanales} required/>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicMateria">
                                    <Form.Label>Materia</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteMateria({ ...estudianteMateria, materia:m.target.value })}
                                        value={estudianteMateria.materia} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicFecha">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setEstudianteMateria({ ...estudianteMateria, fecha:m.target.value })}
                                        value={estudianteMateria.fecha} required/>
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