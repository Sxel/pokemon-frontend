import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
