import React from 'react';
import { FieldError, UseFormRegister, ValidationRule } from 'react-hook-form';
import '../shared/InputField.css'
interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  required: boolean;
  error?: FieldError;
  pattern?: ValidationRule<RegExp>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

const InputField: React.FC<InputFieldProps> = ({ label, name, type, register, required, error, pattern,handleChange }) => {
  return (
    <>
    <div  className="input-field">
      <label htmlFor={name}>{label}</label>
      {name=='email' || name=='phone' ?<input  id={name}   {...register(name, { required, pattern })} type={type} onChange={handleChange}/>
      :
      <input  id={name}   {...register(name, { required, pattern })} type={type}/>
      }

      {error && <span className="error-message">{error.message}</span>}
    </div>
   
    </>
  );
};

export default InputField;
