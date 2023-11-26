import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';

import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Cuerpo } from '../Cuerpo/Cuerpo';


const Dashboard = () => {
    const baseURL = 'http://localhost:3010';

    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    const [estadistica, setEstadistica ] = useState(null);


    useEffect(()=>{
        if(userData.user.tipoUsuario === 0){
            buscarEstadistica();
        }
    },[]); 
        
    
    const buscarEstadistica = async () =>{
        axios.get(baseURL + '/api/v1/estadistica/estadistica',{
            headers:{
                Authorization:`Bearer ${userData.token}`
            }
        })
        .then( resp => {
            setEstadistica(resp.data.dato);
        })
        .catch( error => {
            console.log(error);
        })
    }

    const irAEstudiantes = () => {
        navigate(`/privado/estudiante`);        
    };

    const irAMateria = () => {
        navigate(`/privado/materia`);        
    };

    const irACarrera = () => {
        navigate(`/privado/carrera`);        
    };

    const irAEstudianteMateria = () => {
        navigate(`/privado/estudiantemateria`);        
    };

    const irAEstudianteCarrera = () => {
        navigate(`/privado/estudiantecarrera`);        
    };

    return (userData.user ?
        <>        
        <Cuerpo>
            <div className='container mt-3 mb-1 mb-5'>
                <div className='container'>
                    <h1>Bienvenido {userData.user.nombre}!</h1>
                </div>

                
                
                <ProtectedElement mustBeEntrenador={true}>

                    <div className='container mt-4 mb-5'>
                        <div className='row'>
                            <div className='col'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Estudiantes</Card.Title>
                                        <Card.Text>
                                            
                                        </Card.Text>
                                        <Button variant="primary" onClick={irAEstudiantes}>Ver</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='col'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Materias</Card.Title>
                                        <Card.Text>
                                            
                                        </Card.Text>
                                        <Button variant="primary" onClick={irAMateria}>Ver</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='col'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Carreras</Card.Title>
                                        <Card.Text>
                                            
                                        </Card.Text>
                                        <Button variant="primary" onClick={irACarrera}>Ver</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='col'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Estudiantes Materias</Card.Title>
                                        <Card.Text>
                                            
                                        </Card.Text>
                                        <Button variant="primary" onClick={irAEstudianteMateria}>Ver</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='col'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Estudiantes Carreras</Card.Title>
                                        <Card.Text>
                                            
                                        </Card.Text>
                                        <Button variant="primary" onClick={irAEstudianteCarrera}>Ver</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </ProtectedElement>
                <ProtectedElement mustBePresidente={true}>
                    <div className='row'>
                        <h3>Scaloneta</h3>
                        <div className='container mt-3 mb-1 mb-5'>
                            <div className="col-md-12">
                                <div className='row'>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card bg='success'>
                                            <Card.Body>
                                                <Card.Title>Futbolistas Creados</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Activos</Card.Subtitle>
                                                <Card.Text><h3>100</h3></Card.Text>                                    
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card bg='danger'>
                                            <Card.Body>
                                                <Card.Title>Lesionados</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">No llegan...</Card.Subtitle>
                                                <Card.Text><h3>10</h3></Card.Text>                                    
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card bg='info'>
                                            <Card.Body>
                                                <Card.Title>Convocatorias</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Con 26 convocados</Card.Subtitle>
                                                <Card.Text><h3>10</h3></Card.Text>                                    
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card bg='info'>
                                            <Card.Body>
                                                <Card.Title>Próximo Partido</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Córdoba</Card.Subtitle>
                                                <Card.Text><h3>14/11/2023</h3></Card.Text>                                    
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <h3>Bedelia</h3>
                        <div className='container mt-3 mb-1 mb-5'>
                            <div className="col-md-12">
                                <div className='row'>                                
                                    <Col sm={6} md={4} lg={3}>
                                        <Card bg='info'>
                                            <Card.Body>
                                                <Card.Title>Estudiantes + 30</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Con mas de 30 años</Card.Subtitle>
                                                <Card.Text><h3>{(estadistica ? estadistica.mas30 : <></>)}</h3></Card.Text>                                    
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col sm={6} md={4} lg={3}>
                                        <Card bg='info'>
                                            <Card.Body>
                                                <Card.Title>Inscriptos TUDW</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Cant. Insc. TUDW</Card.Subtitle>
                                                <Card.Text><h3>{(estadistica ? estadistica.cantidadInscriptos : <></>)}</h3></Card.Text>   
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </div>
                </ProtectedElement>
            </div>
        </Cuerpo>    
        </> : <></>
    )
};

export { Dashboard };