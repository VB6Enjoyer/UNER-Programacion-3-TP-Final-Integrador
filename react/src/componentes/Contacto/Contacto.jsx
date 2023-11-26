//hook de react
import { useState } from "react";
import  axios  from 'axios';
//clases bootstrap
import { Form, Button, Card, Table} from "react-bootstrap" ;
import { Cuerpo } from "../Cuerpo/Cuerpo";

export function Contacto (){
    const baseURL = 'http://localhost:3005/contacto';

    // objeto para almacenar la información del formulario
    const [formulario, setFormulario] = useState({nombre:'', correo:'', mensaje:''});

    
    // function enviarInformacion(){
    //     alert(JSON.stringify(formulario));        
    // }   

    const enviarInformacion = async(e)=>{
        e.preventDefault();

		// argumentos: direccion del servidor, datos enviados al servidor
        axios.post(baseURL,formulario)
        .then( res => {
            console.log(res);
            alert(res.data.respuesta);
            setFormulario({nombre:'', correo:'', mensaje:''});
        })
        .catch( error=> {
            console.log('error ', error);
        });

    }

    return(
        <>
            <Cuerpo>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <Card>
                            <Card.Body>
                                <Card.Title>Envianos tu consulta</Card.Title>
                                
                                <Form onSubmit={e => enviarInformacion(e)}>
                                    <Form.Group className="mb-3" controlId="formBasicNombre">
                                        <Form.Label>Nombre y Apellido</Form.Label>
                                        <Form.Control type="text" onChange={(e) => setFormulario({ ...formulario, nombre:e.target.value })}
                                            value={formulario.nombre} required/>
                                        <Form.Text className="text-muted">
                                            No compartiremos tu correo.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCorreo">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control type="email" onChange={(e) => setFormulario({ ...formulario, correo: e.target.value})}
                                            value={formulario.correo} required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicMensaje">
                                        <Form.Label>Mensaje</Form.Label>
                                        <Form.Control as="textarea" rows={5} onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value})}
                                            value={formulario.mensaje} required/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Enviar
                                    </Button>
                                </Form>  
                            </Card.Body>
                            </Card>
                        </div>

                        <div className="col-md-6">
                        <Card>
                            <Card.Body>
                                <Card.Title>Información Útil</Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Departamen</th>
                                        <th>Teléfono</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>operadora</td>
                                            <td>421 0001</td>
                                        </tr>
                                        <tr>
                                            <td>decano</td>
                                            <td>421 0002</td>
                                        </tr>
                                        <tr>
                                            <td>pasantías</td>
                                            <td>421 0003</td>
                                        </tr>
                                    </tbody>
                                    </Table>

                                    <p>
                                    Monseñor Tavella 1424. Concordia. CP(3200). | Provincia de Entre Ríos
    Teléfono: (+54) (345) 4231400 – Fax: (+54) (345) 4231410 | E-mail.: informes.fcad@uner.edu.ar
                                    </p>
                            </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </Cuerpo>
        </>
    )
}