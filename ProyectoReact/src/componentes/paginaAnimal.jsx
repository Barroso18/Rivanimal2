import "../estilos/paginaAnimal.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modales/Modal.jsx";
import PaseoCrear from "./Modales/PaseoCrear.jsx";
import ServicioAnimales from "../servicios/servicioAnimales";
import { useAuth } from "../Login/AuthProvider";
import {buscaTratamientoTipo} from "../herramientas/buscaTratamientoTipo";
import { use } from "react";
import servicioPaseos from "../servicios/servicioPaseos.js";

const PaginaAnimal = () => {
  const [activeTab, setActiveTab] = useState("salud"); // Estado para controlar la pestaña activa
  const { idanimal } = useParams();
  console.log("idanimal recibido:", idanimal);
  const { user } = useAuth();
  const usuario = user.data.usuario; // Usuario temporal
  const [tratamientos, setTratamientos] = useState([]);
  const [paseos, setPaseos] = useState([]);
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

  const [modals, setModals] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });

  // Función para gestionar los modales
  const gestionarModal = (tipoModal, estadoAbierto) => {
    setModals((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
  };

  useEffect(() => {
    if (!idanimal) {
      console.error("ID del animal no proporcionado.");
      return;
    }

    ServicioAnimales.buscaPorID(parseInt(idanimal))
      .then((response) => {
        //console.log("animalInformacion", response.data);
        setAnimalInformacion(response.data); // Actualiza el estado con los datos del animal
      })
      .catch((error) => {
        console.error("Error al obtener el animal:", error);
      });
  }, [idanimal]);

  useEffect(() => {
    if (animalInformacion.id_animal) {
      ServicioAnimales.buscaTratamientoPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          console.log("tratamientos", response.data);
          setTratamientos(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener los tratamientos:", error);
        });
    }
  },[animalInformacion.id_animal]);
  const crearPaseo = (animal) => {
    gestionarModal("crear", true);
  };

  useEffect(() => {
    if (animalInformacion.id_animal) {
      servicioPaseos.getPaseosPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          console.log("paseos", response.data);
          setPaseos(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener los tratamientos:", error);
        });
    }
  }, [animalInformacion.id_animal]);

  return (
    <div className="animal">
      <div className="ficha-container">
        <div className="foto">
          {/* Verificación condicional para evitar errores */}
          {animalInformacion.foto ? (
            <img src={animalInformacion.foto} alt="Perro en adopción" />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>
        <div className="info">
          <h1 className="titulo">
            Ficha de <span className="nombre">{animalInformacion.nombre}</span>
          </h1>
          <span className="adopcion">
            <i>💚 En adopción</i>
          </span>

          <div className="detalles">
            <p>
              <strong>Nombre:</strong> {animalInformacion.nombre}{" "}
              <strong>Clase:</strong> {animalInformacion.clase}
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
            <p>
              <strong>Comportamiento:</strong> {animalInformacion.comportamiento}
            </p>
          </div>
        </div>
      </div>
      <div className="tabs-container">
        {/* Tabs */}
        <div className="tabs flex border-b border-gray-300">
          <button
            className={`tab px-4 py-2 ${
              activeTab === "salud"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("salud")}
          >
            Salud
          </button>
          <button
            className={`tab px-4 py-2 ${
              activeTab === "higiene"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("higiene")}
          >
            Higiene
          </button>
          <button
            className={`tab px-4 py-2 ${
              activeTab === "paseos"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("paseos")}
          >
            Paseos
          </button>
          <button
            className={`tab px-4 py-2 ${
              activeTab === "alimentacion"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("alimentacion")}
          >
            Alimentación
          </button>
          <button
            className={`tab px-4 py-2 ${
              activeTab === "socializacion"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("socializacion")}
          >
            Socialización
          </button>
          <button
            className={`tab px-4 py-2 ${
              activeTab === "otros"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("otros")}
          >
            Otros
          </button>
        </div>
        {/* Contenido de las tabs */}
        <div className="tab-content mt-4">
          {activeTab === "salud" && (
            <div>Información de la salud del animal.</div>
          )}

          {activeTab === "higiene" && (
            <div className="higiene">Información de la higiene del animal.</div>
          )}

          {activeTab === "paseos" && (
            <div>
              Paseos del animal. Aquí irá la lista de paseos que se le han dado
              al animal.
              {
                paseos.map((paseo,indice) => {
                  const duracion = Math.floor((new Date(paseo.fecha_hora_fin) - new Date(paseo.fecha_hora_inicio))/60000);
                  return (
                    <div key={indice}>
                      <p>Duración: {duracion} min</p>
                      <p>Lugar: {paseo.ubicaciones}</p>
                      <p>Cacas: {paseo.caca_nivel}</p>
                      <p>Descripcion: {paseo.descripcion}</p>
                    </div>
                  );
                })
              }
            </div>
          )}

          {activeTab === "alimentacion" && (
            <div>Alimentación del animal.{buscaTratamientoTipo("alimentacion",tratamientos).descripcion}</div>
          )}
          {activeTab === "socializacion" && (
            <div>Socialización con personas y otros animales.</div>
          )}
          {activeTab === "otros" && <div>Otros datos del animal.</div>}
        </div>
      </div>
      <Modal
        isOpen={modals.crear}
        onClose={() => gestionarModal("crear", false)}
      >
        <PaseoCrear
          nombreAnimal={animalInformacion.nombre}
          voluntario={usuario}
          onClose={() => gestionarModal("crear", false)}
        />
      </Modal>
    </div>
  );
};

export default PaginaAnimal;