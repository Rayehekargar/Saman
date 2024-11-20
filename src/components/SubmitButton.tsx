import React from 'react';
import '../shared/SubmitButton.css'
import { Check } from "react-feather"
interface SubmitButtonProps {

  isDisabled: boolean;
  type: 'button' | 'submit' | 'reset';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({isDisabled ,type}) => {
  return (
    <button type={type} className="submit-button"  disabled={isDisabled}>
      Submit
    </button>
  );
};

export default SubmitButton;
