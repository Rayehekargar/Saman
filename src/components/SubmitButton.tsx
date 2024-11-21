import React from 'react';
import '../shared/SubmitButton.css'
interface SubmitButtonProps {

  isDisabled: boolean;
  type: 'button' | 'submit' | 'reset';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({isDisabled ,type}) => {
  return (
    <button type={type} className="submit-button"  disabled={isDisabled}>
        ثبت
    </button>
  );
};

export default SubmitButton;
