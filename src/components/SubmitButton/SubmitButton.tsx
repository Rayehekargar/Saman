import React from 'react';
import {fa} from '../../shared/i18n/fa'
import './SubmitButton.css'
interface SubmitButtonProps {

  isDisabled: boolean;
  type: 'button' | 'submit' | 'reset';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({isDisabled ,type}) => {
  return (
    <button type={type} className="submit-button"  disabled={isDisabled}>
        {fa.components.submitButton.submit}
    </button>
  );
};

export default SubmitButton;
