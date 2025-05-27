import React from 'react';
import '../../estilos/estilos.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // solo cerrar si el clic fue en el fondo, no en el contenido
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          className="close-btn absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
