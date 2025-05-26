import React, { useState } from 'react';
import Modal from './Modales/Modal';
import PaseoConsultar from './Modales/PaseoConsultar';
import ReporteGatoConsultar from './Modales/ReporteGatoConsultar';

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

function CalendarioDinamicoAnimal({ reportes = [], clase, crearPaseo, crearReporteGato,onCrearReporte }) {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [modalAbiertoPerro, setModalAbiertoPerro] = useState(false);
  const [modalAbiertoGato, setModalAbiertoGato] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  const obtenerDiasDelMes = (año, mes) => new Date(año, mes + 1, 0).getDate();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();

  const reportesPorDia = {};
  if (reportes) {
    reportes.forEach(r => {
      const fecha = new Date(r.fecha_hora_inicio);
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

    for (let i = 0; i < inicio; i++) {
      celdas.push(<div key={`empty-${i}`}></div>);
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const esHoy = dia === new Date().getDate() && mes === new Date().getMonth() && año === new Date().getFullYear();
      const reporte = reportesPorDia[dia];
      const tieneReporte = !!reporte;

      celdas.push(
        <button
          key={dia}
          className={`w-10 h-10 rounded-lg text-base transition
            ${esHoy ? 'bg-blue-100 text-blue-600 font-bold' : ''}
            ${tieneReporte ? 'bg-green-300 text-white font-bold border-2 border-green-500' : 'hover:bg-orange-100 hover:font-semibold'}
          `}
          title={tieneReporte ? 'Tienes un reporte este día' : ''}
          onClick={() => {
            if (tieneReporte) {
              setReporteSeleccionado(reporte);
              if (clase === "perro") setModalAbiertoPerro(true);
              if (clase === "gato") setModalAbiertoGato(true);
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

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => cambiarMes(-1)} className="text-gray-500 hover:text-gray-800 text-2xl">
          &lt;
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">{nombreMes}</h2>
        <button onClick={() => cambiarMes(1)} className="text-gray-500 hover:text-gray-800 text-2xl">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-base font-medium text-gray-500 mb-4">
        {diasSemana.map((dia, index) => <div key={index}>{dia}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-3 text-center">{renderizarDias()}</div>

      {/* 🎯 Botones de Reportes */}
      <div className="mt-6 flex flex-col items-center gap-4">
        {clase === 'perro' && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={crearPaseo}
          >
            Crear paseo
          </button>
        )}

        {clase === 'gato' && (
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            onClick={crearReporteGato}
          >
            Reporte gato
          </button>
        )}
      </div>

      {/* 🎯 Modales */}
      <Modal isOpen={modalAbiertoPerro} onClose={() => setModalAbiertoPerro(false)}>
        {reporteSeleccionado && (
          <PaseoConsultar paseoInformacion={reporteSeleccionado} onClose={() => setModalAbiertoPerro(false)} />
        )}
      </Modal>

      <Modal isOpen={modalAbiertoGato} onClose={() => setModalAbiertoGato(false)}>
        {reporteSeleccionado && (
          <ReporteGatoConsultar repGatoInformacion={reporteSeleccionado} onClose={() => setModalAbiertoGato(false)} />
        )}
      </Modal>
    </div>
  );
}

export default CalendarioDinamicoAnimal;
