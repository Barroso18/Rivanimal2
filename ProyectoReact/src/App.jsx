import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuSuperior from './componentes/menu';
import Pagina404 from "./componentes/Pagina404";
import PaginaAnimal from './componentes/paginaAnimal';
import PaginaAnimales from './componentes/paginaAnimales';
import ServicioAnimales from './servicios/servicioAnimales';
import ServicioPaseos from './servicios/servicioPaseos';
import useStateStorage from './servicios/UseStateStorage';
import PaginaPaseos from './componentes/PaginaPaseos';
import Calendario from './componentes/Calendario';
import { AuthProvider } from './Login/AuthProvider';
import Login from './Login/login';
import Registro from './Login/Registro';
import RutasProtegidas from './Login/RutasProtegidas';
import ServicioUsuarios from './servicios/servicioUsuarios';
import PerfilUsuario from './componentes/PerfilUsuario';
import PaginaVoluntarios from './componentes/PaginaVoluntarios';

function App() {
  const [animales, setAnimales] = useStateStorage("animales", []);
  const [paseos, setPaseos] = useStateStorage("paseos", []);
  const [usuarios, setUsuarios] = useStateStorage("usuarios", []);

 /* useEffect(() => {
    ServicioAnimales.getAll()
      .then(response => setAnimales(response.data))
      .catch(() => {
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar los animales :(",
          icon: "question"
        });
      });
  }, []);*/

  useEffect(() => {
    let funcion= "animalestodos";
    fetch(`http://localhost/Rivanimal2/FuncionesPHP/animales.php?funcion=${funcion}`) // Asegúrate de que la URL es correcta
      .then((response) => response.json())
      .then((data) => setAnimales(data))
      .catch((error) => console.error("Error al obtener los animales:", error));
  }, []);


  useEffect(() => {
    ServicioPaseos.getAll()
      .then(response => setPaseos(response.data))
      .catch(() => {
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar los paseos :(",
          icon: "question"
        });
      });
  }, []);

  useEffect(() => {
    ServicioUsuarios.getAll()
      .then(response => setUsuarios(response.data))
      .catch(() => {
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar los usuarios :(",
          icon: "question"
        });
      });
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <MenuSuperior paseos={paseos} />
        </header>
        <main>
          <Routes>
            <Route path="*" element={<Pagina404 />} />
            <Route path="/" element={
              <RutasProtegidas>
                <PaginaAnimales animales={animales} />
              </RutasProtegidas>
            } />
            <Route path='/pagina-animal/:nombre' element={
              <RutasProtegidas>
                <PaginaAnimal animales={animales} setAnimales={setAnimales} />
              </RutasProtegidas>
            } />
            <Route path='/paseos' element={
              <RutasProtegidas>
                <PaginaPaseos paseos={paseos} setPaseos={setPaseos} />
              </RutasProtegidas>
            } />
            <Route path='/pagina-animales' element={
              <RutasProtegidas>
                <PaginaAnimales
                  animales={animales}
                  setAnimales={setAnimales}
                  paseos={paseos}
                  setPaseos={setPaseos}
                  usuarios={usuarios}
                />
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
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
