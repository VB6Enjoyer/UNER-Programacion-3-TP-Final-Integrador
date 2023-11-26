import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../UserContext/UserContext';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Materia.css' ;


export function Materia() {
    const baseURL = 'http://localhost:3010';

    const { userData, setUserData } = useContext(UserContext);

    const [datos, setDatos] = useState(null);
    const [materia, setMateria] = 
    useState({horasSemanales:'', 
        nombreMateria:'',
        tipoMateria:'', 
        });
    
    const [showModal, setShowModal] = useState(false);
    const cerrarModal = () => setShowModal(false);

    useEffect(()=>{
        buscarMaterias();
    },[]); 

    // para buscar la informacion de materias le envio el token del usuario logueado
    const buscarMaterias = async () =>{
        axios.get(baseURL + '/api/v1/materia/materias',{
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
    const eliminarMateria = async (idMateria) =>{

        Swal.fire({
            title: '¿Estas seguro de eliminar la materia seleccionada?',
            showDenyButton: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(baseURL + '/api/v1/materia/materias' + idMateria, {
                    headers:{
                        Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                    }
                })
                .then( async resp => {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon:'success'});

                    if (result.isConfirmed){
                        buscarMaterias();   
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
        formData.append('horasSemanales', materia.horasSemanales);
        formData.append('nombreMateria', materia.nombreMateria);
        formData.append('tipoMateria', materia.tipoMateria);
        try {

                  
        const response = await axios.post(baseURL + '/api/v1/materia/materias', formData, {
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
                buscarMaterias();
                setMateria({horasSemanales:'', 
                nombreMateria:'',
                tipoMateria:'',
                });    
            }  
            
        }
        } catch (error) {
        console.error('Error al crear una materia', error);
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
                        <h1>Materias</h1>
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
                            <th className='miThead'>Horas Semanales</th>
                            <th className='miThead'>Nombre</th>
                            <th className='miThead'>Tipo</th>
                            <th className='miThead'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos ? (datos.map((item, index) => (
                                <tr key={index}> 
                                    <td>{item.horasSemanales}</td>
                                    <td>{item.nombreMateria}</td>
                                    <td>{item.tipoMateria}</td>
                                    <td>
                                        <Button variant="success" className='miBoton'>Editar</Button>
                                        <Button variant="danger" onClick={()=>eliminarMateria(item.idMateria)}>Eliminar</Button>
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
                    <Modal.Title>Nueva Materia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => enviarInformacion(e)}>
                        <div className='row'>
                            <div className="col-md-4">
                                <Form.Group className="mb-3" controlId="formBasicHoras">
                                    <Form.Label>Horas Semanales</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setMateria({ ...materia, horasSemanales:m.target.value })}
                                        value={materia.horasSemanales} required/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>                            
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setMateria({ ...materia, nombreMateria:m.target.value })}
                                        value={materia.nombreMateria} required/>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formBasicTipo">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control type="text"
                                        onChange={(m) => setMateria({ ...materia, tipoMateria:m.target.value })}
                                        value={materia.tipoMateria} required/>
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