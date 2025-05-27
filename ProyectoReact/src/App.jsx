import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuSuperior from './componentes/menu';
import MenuDesplegable from './componentes/MenuDesplegable';
import Pagina404 from "./componentes/Pagina404";
import PaginaAnimal from './componentes/paginaAnimal';
import PaginaAnimales from './componentes/paginaAnimales';
import PerfilUsuarioPublico from './componentes/PerfilUsuarioPublico';
import ServicioAnimales from './servicios/servicioAnimales';
import ServicioPaseos from './servicios/servicioPaseos';
import useStateStorage from './servicios/UseStateStorage';
import Calendario from './componentes/Calendario';
import { AuthProvider } from './Login/AuthProvider';
import Login from './Login/login';
import Registro from './componentes/Modales/RegistroUsuario';
import RutasProtegidas from './Login/RutasProtegidas';
import RutaProtegidaPorRol from './Login/RutaProtegidaPorRol';
import ServicioUsuarios from './servicios/servicioUsuarios';
import PerfilUsuario from './componentes/PerfilUsuario';
import PaginaVoluntarios from './componentes/PaginaVoluntarios';
import PaginaGestion from './componentes/PaginaGestion';

function App() {
  const location = useLocation(); // Hook para obtener la ruta actual

  // Función para mostrar el menú superior solo si no estamos en la página de login
  const muestraMenu = () => {
    if (location.pathname !== "/login") { // Ocultar el menú en la página de login
      return <MenuSuperior />;
    }
    return null;
  };
  return (
    <AuthProvider>
      <div className="pagina-Animal App h-[100%]">
        <header className="App-header">
          {muestraMenu()}
        </header>
        <main className='h-[100%]'>
          <Routes>
            <Route path="*" element={<Pagina404 />} />
            <Route path="/" element={
              <RutasProtegidas>
                <PaginaAnimales/>
              </RutasProtegidas>
            } />
            <Route path='/pagina-animal/:idanimal' element={
              <RutasProtegidas>
                <PaginaAnimal/>
              </RutasProtegidas>
            } />
            <Route path='/pagina-animales' element={
              <RutasProtegidas>
                <PaginaAnimales/>
              </RutasProtegidas>
            } />
            <Route path='/Semana' element={
              <RutasProtegidas>
                <Calendario/>
              </RutasProtegidas>
            } />
            <Route path='/tu-perfil' element={
              <RutasProtegidas>
                <PerfilUsuario/>
              </RutasProtegidas>
            } />
            <Route path='/pagina-voluntarios' element={
              <RutasProtegidas>
                <PaginaVoluntarios/>
              </RutasProtegidas>
            } />
            <Route path='/perfil-publico/:nombre_usuario' element={
              <RutasProtegidas>
                <PerfilUsuarioPublico/>
              </RutasProtegidas>
            } />
            <Route path='/pagina-gestion' element={
              <RutaProtegidaPorRol rolesPermitidos={["admin"]}>
                <PaginaGestion/>
              </RutaProtegidaPorRol>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={
              <RutaProtegidaPorRol rolesPermitidos={["admin"]}>
                <Registro/>
              </RutaProtegidaPorRol>
              } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
