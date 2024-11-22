import React from "react";
import "./SuccessModal.css"; 
import {fa} from '../../shared/i18n/fa'
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null; 

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="success-modal-button">
          {fa.components.successModal.ok}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
