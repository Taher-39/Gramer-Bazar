import React, { useState } from 'react';
import { AddToCartAsync } from '../Cart/CartSlice';
import { useDispatch } from 'react-redux';

const CartItemDeleteAlert = ({ item, onConfirm }) => {
  const dispatch = useDispatch();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUndoVisible, setIsUndoVisible] = useState(false);
  const [removedItem, setRemovedItem] = useState(null); 

  const handleRemoveItem = (e) => {
    e.preventDefault();
    setIsAlertOpen(true);
  };

  const confirmRemoveItem = () => {
    setIsAlertOpen(false);
    setIsUndoVisible(true);
    setRemovedItem(item); 
    onConfirm(item);
    setTimeout(() => {
      setIsUndoVisible(false);
      setRemovedItem(null); 
    }, 5000); 
  };

  const undoRemoveItem = () => {
    setIsUndoVisible(false);
    if (removedItem) {
      dispatch(AddToCartAsync(removedItem));
      setRemovedItem(null); 
    }
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
            <p>Are you sure you want to remove this item from the cart?</p>
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
      {isUndoVisible && (
        <div className="fixed bottom-0 left-0 mb-4 ml-4">
          <button
            onClick={undoRemoveItem}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Undo
          </button>
        </div>
      )}
      
    </div>
  );
};

export default CartItemDeleteAlert;
