// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
