// imports de bootstrap
import './header.css' ;
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link} from 'react-router-dom';

import { ProtectedElement } from '../ProtectedElement/ProtectedElement';


export function Header() {
  const { userData, setUserData } = useContext(UserContext);
    
  const navigate = useNavigate();

  const accion = () => {
    navigate('/login');
  }
  
  const irInicio = () => {
    setUserData(null);
    navigate('/');        
  };

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">BEDELIA</Navbar.Brand>
          <Navbar.Toggle aria-controls='algo'/>
          <Navbar.Collapse id='algo'>
            <Nav className="me-auto">            
              <Nav.Link as={Link} to='/institucional'>Institucional</Nav.Link>
              <Nav.Link as={Link} to='/contacto'>Contacto</Nav.Link>
            
              <ProtectedElement mustBeEntrenador={true}>
                <NavDropdown title="Menú" id="nav-dropdown" className='miNavDropdown'>
                  <NavDropdown.Item as={Link} to='/privado/estudiante'>Estudiantes</NavDropdown.Item>              
                  <NavDropdown.Divider />                
                  <NavDropdown.Item as={Link} to='/privado/materia'>Materias</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to='/privado/carrera'>Carreras</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to='/privado/estudiantemateria'>Estudiantes Materias</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to='/privado/estudiantecarrera'>Estudiantes Carreras</NavDropdown.Item>
                </NavDropdown>
              </ProtectedElement>
            </Nav>            
            {userData ? (
              <Button className='btn btn-primary end-button' onClick={irInicio}>Cerrar Sesión</Button>
            ) : (
              <Button className='btn btn-primary end-button' onClick={accion}>Iniciar Sesión</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}