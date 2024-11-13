import React from "react";

function ConfirmationDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto shadow-lg">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to submit?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
