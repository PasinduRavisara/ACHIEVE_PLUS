import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="modal-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
