import './App.css';

//mis compnentes
import { Header } from './componentes/Header/Header';

// mis componentes
import { Contacto } from './componentes/Contacto/Contacto';
import { Institucional } from './componentes/Institucional/Institucional';
import { Cuerpo } from './componentes/Cuerpo/Cuerpo';
import { Estudiante } from './componentes/Estudiante/Estudiante';
import { Materia } from './componentes/Materia/Materia';
import { Carrera } from './componentes/Carrera/Carrera'
import { EstudianteMateria } from './componentes/EstudianteMateria/EstudianteMateria';
import { EstudianteCarrera } from './componentes/EstudiantesCarrera/EstudianteCarrera';



import { Login } from './componentes/Login/Login';    
import { Dashboard } from './componentes/Dashboard/Dashboard';


import { UserProvider } from './componentes/UserContext/UserContext';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute';



function App() {

  return (
    <>
    <BrowserRouter>
      <UserProvider> 
        <Header/>      
        <Routes>
          <Route path='/' element={<Cuerpo/>}/>
          <Route path='/institucional' element={<Institucional/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/login' element={<Login/>}/>
          
          <Route path='/privado/dashboard' 
            element={
              <ProtectedRoute mustBeEntrenador={false}>
                {<Dashboard/>}
              </ProtectedRoute>
          }/>
  
          <Route path='/privado/estudiante' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                {<Estudiante/>}
              </ProtectedRoute>
          }/>

          <Route path='/privado/materia' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                {<Materia/>}
              </ProtectedRoute>
          }/>

          <Route path='/privado/carrera' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                {<Carrera/>}
              </ProtectedRoute>
          }/>

          <Route path='/privado/estudiantemateria' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                {<EstudianteMateria/>}
              </ProtectedRoute>
          }/>

          <Route path='/privado/estudiantecarrera' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                {<EstudianteCarrera/>}
              </ProtectedRoute>
          }/>
          
        </Routes>
      </UserProvider>
    </BrowserRouter>
    </>
  );
}

export default App;