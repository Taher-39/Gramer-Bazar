import React, { useState } from "react";

const Modal = ({ item, onConfirm }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleRemoveItem = (e) => {
    e.preventDefault();
    setIsAlertOpen(true);
  };

  const confirmRemoveItem = () => {
    setIsAlertOpen(false);
    onConfirm(item);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleRemoveItem}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Remove
      </button>
      {isAlertOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-4 rounded shadow-lg text-center">
            <p>Are you sure you want to remove {item.title}?</p>
            <div className="mt-4">
              <button
                onClick={confirmRemoveItem}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mr-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={closeAlert}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
