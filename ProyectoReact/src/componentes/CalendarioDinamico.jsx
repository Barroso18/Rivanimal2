import React, { useState } from 'react';
import Modal from './Modales/Modal'; 
import ReporteDiarioConsultar from './Modales/ReporteDiarioConsultar'; 
import ReporteDiarioCrear from './Modales/ReporteDiarioCrear';

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

function CalendarioDinamico({ reportesDiarios = [], onRecargarReportes, usuarioActual, usuarioPerfil }) {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbiertoRepCrear,setModalAbiertoRepCrear] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  const obtenerDiasDelMes = (año, mes) => {
    return new Date(año, mes + 1, 0).getDate();
  };

  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();

  // Mapear reportes por día para acceso rápido
  const reportesPorDia = {};
  if(reportesDiarios !== null){
    reportesDiarios.forEach(r => {
      const fecha = new Date(r.fecha);
      if (fecha.getFullYear() === año && fecha.getMonth() === mes) {
        reportesPorDia[fecha.getDate()] = r;
      }
    });
  }
  

  const renderizarDias = () => {
    const primerDia = new Date(año, mes, 1).getDay();
    const diasEnMes = obtenerDiasDelMes(año, mes);
    const inicio = (primerDia + 6) % 7;

    const celdas = [];

    // Celdas vacías antes del día 1
    for (let i = 0; i < inicio; i++) {
      celdas.push(<div key={`empty-${i}`}></div>);
    }

    // Celdas de días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const esHoy = dia === new Date().getDate() &&
        mes === new Date().getMonth() &&
        año === new Date().getFullYear();

      const reporte = reportesPorDia[dia];
      const tieneReporte = !!reporte;

      celdas.push(
        <button
          key={dia}
          className={`w-10 h-10 rounded-lg text-base transition
            ${esHoy ? 'bg-blue-100 text-blue-600 font-bold' : ''}
            ${tieneReporte ? 'bg-purple-300 text-white font-bold border-2 border-purple-500' : 'hover:bg-purple-100 hover:font-semibold'}
          `}
          title={tieneReporte ? 'Tienes un reporte este día' : ''}
          onClick={() => {
            if (tieneReporte) {
              setReporteSeleccionado(reporte);
              setModalAbierto(true);
            }
          }}
        >
          {dia}
        </button>
      );
    }

    return celdas;
  };

  const cambiarMes = (offset) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + offset);
    setFechaActual(nuevaFecha);
  };

  const nombreMes = fechaActual.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  });

  // Al cerrar el modal de crear, recarga los reportes diarios
  const handleCerrarCrear = () => {
    setModalAbiertoRepCrear(false);
    if (typeof onRecargarReportes === "function") {
      onRecargarReportes();
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => cambiarMes(-1)}
          className="text-gray-500 hover:text-gray-800 text-2xl"
        >
          &lt;
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">{nombreMes}</h2>
        <button
          onClick={() => cambiarMes(1)}
          className="text-gray-500 hover:text-gray-800 text-2xl"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-base font-medium text-gray-500 mb-4">
        {diasSemana.map((dia, index) => (
          <div key={index}>{dia}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-3 text-center">{renderizarDias()}</div>
      <div className="mt-6 text-center">
        {usuarioActual === usuarioPerfil && (
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition text-lg"
            onClick={() => setModalAbiertoRepCrear(true)}
          >
            Apuntarse
          </button>
        )}
      </div>
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
        {reporteSeleccionado && (
          <ReporteDiarioConsultar reporte={reporteSeleccionado} />
        )}
      </Modal>
      <Modal isOpen={modalAbiertoRepCrear} onClose={handleCerrarCrear}>
        <ReporteDiarioCrear onClose={handleCerrarCrear} />
      </Modal>
    </div>
  );
}

export default CalendarioDinamico;
