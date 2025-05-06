//import "../estilos/paginaAnimal.css";
import "../estilos/estilos.css";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modales/Modal.jsx";
import PaseoCrear from "./Modales/PaseoCrear.jsx";
import ReporteGatoCrear from "./Modales/ReporteGatoCrear.jsx";
import ReporteGatoConsultar from "./Modales/ReporteGatoConsultar.jsx";
import ServicioAnimales from "../servicios/servicioAnimales";
import ServicioUsuarios from "../servicios/servicioUsuarios";
import { useAuth } from "../Login/AuthProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buscaTratamientoTipo } from "../herramientas/buscaTratamientoTipo";
import servicioPaseos from "../servicios/servicioPaseos.js";
import ServicioReporteGatos from "../servicios/servicioReporteGatos.js";
import PaseoConsultar from "./Modales/PaseoConsultar.jsx";
import { calculaDuracion } from "../herramientas/calculaDuracion";
import { buscaReportePorFecha } from "../herramientas/buscaReportePorFecha.js";
import Swal from "sweetalert2";
import servicioReporteDiario from "../servicios/servicioReporteDiario.js";

const PaginaAnimal = () => {
  const [activeTab, setActiveTab] = useState("salud"); // Estado para controlar la pestaña activa
  const { idanimal } = useParams();
  const { user } = useAuth();
  const usuario = user.data.usuario; // Usuario temporal
  const idUsuario = user.data.id; // ID del usuario temporal
  const [tratamientos, setTratamientos] = useState([]);
  const [paseos, setPaseos] = useState([]);
  const [paseoSeleccionado, setPaseoSeleccionado] = useState(null); // Estado para almacenar el paseo seleccionado
  //Variables para la paginacion de los paseos
  const [paginaActual, setPaginaActual] = useState(0);
  const elementosPorPagina = 4;
  // Inicializar con propiedades vacías para evitar errores
  const [animalInformacion, setAnimalInformacion] = useState({
    foto: "",
    nombre: "",
    clase: "",
    sexo: "",
    fecha_ingreso: "",
    fecha_nacimiento: "",
    raza: "",
    tamaño: "",
    peso: "",
    situacion: "",
    comportamiento: "",
  });
  const [estadoAnimal, setEstadoAnimal] = useState({});
  //Variables para crear las tabs
  const tabs = [
    { id: "salud", label: "Salud" },
    { id: "higiene", label: "Higiene" },
    { id: "reportes", label: "Reportes" },
    { id: "alimentacion", label: "Alimentación" },
    { id: "socializacion", label: "Socialización" },
    { id: "otros", label: "Otros" },
  ];
  const tabRefs = useRef({});
  const [modalsPaseo, setModalsPaseo] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });
  const [modalsGato, setModalsGato] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });

  // Función para gestionar los modales de paseos
  const gestionarModalPaseo = (tipoModal, estadoAbierto) => {
    setModalsPaseo((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
  };

  // Función para gestionar los modales de gatos
  const gestionarModalGato = (tipoModal, estadoAbierto) => {
    setModalsGato((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
  };

  useEffect(() => {
    if (!idanimal) {
      console.error("ID del animal no proporcionado.");
      return;
    }

    ServicioAnimales.buscaPorID(parseInt(idanimal))
      .then((response) => {
        setAnimalInformacion(response.data); // Actualiza el estado con los datos del animal
      })
      .catch((error) => {
        console.error("Error al obtener el animal:", error);
      });
  }, [idanimal]);
  //Buscamos el estado del animal
  useEffect(() => {
    if (animalInformacion.id_animal) {
      ServicioAnimales.buscaEstadoAnimal(parseInt(animalInformacion.id_animal))
        .then((response) => {
          setEstadoAnimal(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener el estado del animal:", error);
        });
    }
  }, [animalInformacion.id_animal]);

  useEffect(() => {
    if (animalInformacion.id_animal) {
      ServicioAnimales.buscaTratamientoPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          setTratamientos(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener los tratamientos:", error);
        });
    }
  }, [animalInformacion.id_animal]);
  // Cuando una tab se activa la centramos con scrollIntoView
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  const crearPaseo = (animal) => {
    gestionarModalPaseo("crear", true);
  };

  const crearReporteGato = (animal) => {
    gestionarModalGato("crear", true);
  };

  useEffect(() => {
    

    if (animalInformacion.id_animal) {
      if(animalInformacion.clase == "perro"){
      servicioPaseos.getPaseosPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          setPaseos(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener los tratamientos:", error);
        });
      }
      if(animalInformacion.clase == "gato"){ 
        ServicioReporteGatos.getReportesPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          setPaseos(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener los tratamientos:", error);
        });

      }
    }
  }, [animalInformacion]);
  function filtrarInfo(filtro) {
    if (tratamientos != null) {
      return buscaTratamientoTipo(filtro, tratamientos).descripcion;
    }
    return "";
  }
  //Funcion para cambiar el estado del animal
  function cambiaEstadoAnimal() {}

  //Funcion para buscar los reportes diarios por usuario
  async function filtraReportesPorUsuario(usuario) {
    try {
      const response = await servicioReporteDiario.buscarReportesDiariosPorUsuario(usuario);
      const reportesDiarios = response.data;

      // Buscar el reporte diario por la fecha actual
      const fechaActual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
      const reporteActual = buscaReportePorFecha(fechaActual, reportesDiarios);
      return reporteActual || null;
    } catch (error) {
      console.error("Error al buscar los reportes de paseos:", error);
      return null;
    }
  }

  const consultarPaseo = (paseo) => {
    setPaseoSeleccionado(paseo); // Almacena el paseo seleccionado en el estado
    gestionarModalPaseo("consultar", true); // Abre el modal de consulta
  };
  const consultarReporteGato = (reporteGato) => {
    setPaseoSeleccionado(reporteGato); // Almacena el reporteGato seleccionado en el estado
    gestionarModalGato("consultar", true); // Abre el modal de consulta
  };
  const muestraPaseos = () => {
    if (paseos == null || paseos.length == 0) {
      return <p>No hay paseos registrados</p>;
    } else {
      const totalPaginas = Math.ceil(paseos.length / elementosPorPagina);

      const paseosPaginados = paseos.slice(
        paginaActual * elementosPorPagina,
        (paginaActual + 1) * elementosPorPagina
      );

      const siguientePagina = () => {
        if (paginaActual < totalPaginas - 1) {
          setPaginaActual(paginaActual + 1);
        }
      };

      const anteriorPagina = () => {
        if (paginaActual > 0) {
          setPaginaActual(paginaActual - 1);
        }
      };
      return (
        <div className="bg-gray-100 w-full">
          <div className="p-4 rounded-2xl shadow-md w-full">
            <div className="flex items-center justify-between mb-4">
              <button className="text-2xl"
                onClick={siguientePagina}
                disabled={paginaActual === totalPaginas - 1}>
                <ArrowLeft className="mr-2" />
              </button>

              <h2 className="text-xl font-semibold">Paseos</h2>

              <button className="text-2xl"
                onClick={anteriorPagina}
                disabled={paginaActual === 0}>
                <ArrowRight className="ml-2" />
              </button>
            </div>

            <ul className="space-y-4">
              {paseosPaginados.map((paseo, index) => (
                <li key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold">
                      {paseo.fecha_hora_fin} {paseo.nombre_usuario}
                    </p>
                    <p>
                      <strong>Duración:</strong>{" "}
                      {calculaDuracion(
                        paseo.fecha_hora_inicio,
                        paseo.fecha_hora_fin
                      )}{" "}
                      min <strong>Cacas:</strong> {paseo.caca_nivel}
                    </p>
                  </div>

                  <button
                    onClick={() => consultarPaseo(paseo)}
                    className="flex items-center gap-2 bg-purple-300 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-400 transition"
                  >
                    <span className="text-lg">I</span>
                    Mas info
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  };


  const muestraReportesGatos = () => {
    if (paseos == null || paseos.length == 0) {
      return <p>No hay paseos registrados</p>;
    } else {
      const totalPaginas = Math.ceil(paseos.length / elementosPorPagina);

      const paseosPaginados = paseos.slice(
        paginaActual * elementosPorPagina,
        (paginaActual + 1) * elementosPorPagina
      );

      const siguientePagina = () => {
        if (paginaActual < totalPaginas - 1) {
          setPaginaActual(paginaActual + 1);
        }
      };

      const anteriorPagina = () => {
        if (paginaActual > 0) {
          setPaginaActual(paginaActual - 1);
        }
      };
      return (
        <div className="bg-gray-100 w-full">
          <div className="p-4 rounded-2xl shadow-md w-full">
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-2xl"
                onClick={siguientePagina}
                disabled={paginaActual === totalPaginas - 1}>
                <ArrowLeft className="mr-2" />
              </button>

              <h2 className="text-xl font-semibold">Paseos</h2>

              <button
                className="text-2xl"
                onClick={anteriorPagina}
                disabled={paginaActual === 0}
              >
                <ArrowRight className="ml-2" />
              </button>
            </div>

            <ul className="space-y-4">
              {paseosPaginados.map((reporteGato, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold">
                      {reporteGato.fecha_hora_fin} {reporteGato.nombre_usuario}
                    </p>
                    <p>
                      <strong>Duración:</strong>{" "}
                      {calculaDuracion(
                        reporteGato.fecha_hora_inicio,
                        reporteGato.fecha_hora_fin
                      )}{" "}
                      min <strong>Cacas:</strong> {reporteGato.caca_nivel}
                    </p>
                  </div>

                  <button
                    onClick={() => consultarReporteGato(reporteGato)}
                    className="flex items-center gap-2 bg-purple-300 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-400 transition"
                  >
                    <span className="text-lg">I</span>
                    Mas info
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  };

  function esPerro(){
    if(animalInformacion.clase == "perro"){
      return (<><strong>PPP: </strong>{animalInformacion.ppp ? "Sí" : "No"}</>);}
    else{
      return (<></>);
    }
  }

  function esPerro2(){
    if(animalInformacion.clase == "perro"){
      return (<>{activeTab === "reportes" && muestraPaseos()}</>);
    }else if(animalInformacion.clase == "gato"){
      return (<>{activeTab === "reportes" && muestraReportesGatos()}</>);
    
    }  else{
      return (<></>);
    }
  }

  function agregarBotonesReportes(){
    if(animalInformacion.clase == "perro"){
      return (
      <>{/* Aqui deberiamos poner una funcion que segun el estado del animal muestre un boton u otro */}
        <button
          className="add-info-btn"
          onClick={() => crearPaseo(animalInformacion.nombre)}
        >
          Iniciar paseo
        </button>
        {/* Pero el boto de guardar paseo solo lo debe de tener el usuario que ha iniciado ese paseo y un administrador tambien 
        puede guardarlo */}
        <button className="add-info-btn">Guardar paseo</button>
      </>);
    }
    else if (animalInformacion.clase == "gato"){
      return (<>
        <button className="add-info-btn"  onClick={() => crearReporteGato(animalInformacion.nombre)}>Reporte gato</button>
      </>);
    }else{
      return (<></>);
    }
  }
  return (
    <div className="animal px-4 py-6">
      <div className="ficha-container bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">
        <div className="foto flex-shrink-0 w-full md:w-1/2 flex justify-center">
          {/* Verificación condicional para evitar errores */}
          {animalInformacion.foto ? (
            <img
              src={animalInformacion.foto}
              alt="Perro en adopción"
              className="rounded-lg w-full h-auto object-cover max-h-[400px]"
            />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>
        <div className="info text-gray-800 text-sm w-full md:w-1/2">
          <h1 className="titulo text-xl font-semibold text-red-700 mb-2">
            Ficha de <span className="nombre">{animalInformacion.nombre}</span>
          </h1>
          <span className="adopcion inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded mb-4">
            <i>💚 En adopción</i>
          </span>

          <div className="detalles space-y-2 bg-gray-100 p-4 rounded-md">
            <p>
              <strong>Nombre:</strong> {animalInformacion.nombre}{" "}
            </p>
            <p>
              <strong>Clase:</strong> {animalInformacion.clase}{" "}
              <strong>Nivel:</strong> {animalInformacion.nivel}{" "}
              {esPerro()}
            </p>
            <p>
              <strong>Sexo:</strong> {animalInformacion.sexo}
            </p>
            <p>
              <strong>Desde:</strong> {animalInformacion.fecha_entrada}{" "}
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong>{" "}
              {animalInformacion.fecha_nacimiento}{" "}
            </p>
            <p>
              <strong>Raza:</strong> {animalInformacion.raza}
            </p>
            <p>
              <strong>Tamaño:</strong> {animalInformacion.tamaño}{" "}
              <strong>Peso:</strong> {animalInformacion.peso} Kg
            </p>
            <p>
              <strong>Situación:</strong> {animalInformacion.situacion}
            </p>
          </div>
        </div>
      </div>
      <div className="tabs-container border border-gray-300 rounded-md overflow-hidden mb-4 max-w-[800px] w-full">
        {/* Tabs */}
        <div className="tabs flex border-b border-gray-300 overflow-x-auto whitespace-nowrap no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              className={`tab px-4 py-2 shrink-0 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>
        {/* Contenido de las tabs */}
        <div className="tab-content mt-4">
          {activeTab === "salud" && (
            <div>Información de la salud del animal.</div>
          )}

          {activeTab === "higiene" && (
            <div className="higiene">Información de la higiene del animal.</div>
          )}
          {esPerro2()}
          

          {activeTab === "alimentacion" && (
            <div>Alimentación del animal.{filtrarInfo("alimentacion")}</div>
          )}
          {activeTab === "socializacion" && (
            <div>Socialización con personas y otros animales.</div>
          )}
          {activeTab === "otros" && (
            <div>
              Otros datos del animal.
              <p>
                <strong>Comportamiento:</strong>{" "}
                {animalInformacion.comportamiento}
              </p>
            </div>
          )}
        </div>
      </div>
      {agregarBotonesReportes()}
      
      <Modal isOpen={modalsPaseo.crear}
        onClose={() => gestionarModalPaseo("crear", false)}>
        <PaseoCrear nombreAnimal={animalInformacion.nombre}
          voluntario={idUsuario}
          onClose={() => gestionarModalPaseo("crear", false)}/>
      </Modal>
      <Modal isOpen={modalsPaseo.consultar}
        onClose={() => gestionarModalPaseo("consultar", false)}>
        <PaseoConsultar paseoInformacion={paseoSeleccionado}
          onClose={() => gestionarModalPaseo("consultar", false)}/>
      </Modal>
      <Modal isOpen={modalsGato.crear}
        onClose={() => gestionarModalGato("crear", false)}>
        <ReporteGatoCrear
          nombreAnimal={animalInformacion.nombre}
          voluntario={idUsuario}
          onClose={() => gestionarModalGato("crear", false)}/>
      </Modal>
      <Modal
        isOpen={modalsGato.consultar}
        onClose={() => gestionarModalGato("consultar", false)}>
        <ReporteGatoConsultar
          nombreAnimal={animalInformacion.nombre}
          voluntario={idUsuario}
          onClose={() => gestionarModalGato("consultar", false)}/>
      </Modal>
    </div>
  );
};

export default PaginaAnimal;