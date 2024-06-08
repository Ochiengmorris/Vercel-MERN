import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, onRedirect, title, children }) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
        onRedirect();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full z-50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>
                <div className="mb-4">
                    {children}
                </div>
                <div className="text-right">
                    <button onClick={handleClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') // Ensure you have a div with id="modal-root" in your HTML
    );
};

export default Modal;