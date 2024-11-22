import React from 'react';
import './DeleteModal.css';
import {fa} from '../../shared/i18n/fa'

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-button">
            {fa.components.modal.cancel}
          </button>
          <button onClick={onConfirm} className="confirm-button">
          {fa.components.modal.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
