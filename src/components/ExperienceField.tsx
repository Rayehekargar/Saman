import React from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import '../shared/ExperienceForm.css'

interface ExperienceFormProps {
  index: number;
  remove: () => void;
}

interface FormValues {
  experiences: { role: string; duration: number }[];
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ index, remove }) => {
  const { register, formState: { errors } } = useFormContext<FormValues>();
  const roleName = `experiences.${index}.role` as const;
  const durationName = `experiences.${index}.duration` as const;
 

  const roleError = errors.experiences?.[index]?.role;
  const durationError = errors.experiences?.[index]?.duration;

  return (
    <div className="experience-form">
      <div className="field">
        <input 
          {...register(roleName, { required: 'Role is required' })} 
          type="text" 
          placeholder="Experience Title" 
        />
        {roleError && <span className="error-message">{roleError.message}</span>}
      </div>
      
      <div className="field">
        <input 
          {...register(durationName, { required: 'Duration is required' })} 
          placeholder="Duration (months)" 
          type="text" 
          pattern="[0-9]*"
          onKeyDown={(e) => {
            if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
              e.preventDefault();
            }
          }}
        />
        {durationError && <span className="error-message">{durationError.message}</span>}
      </div>

      <button type="button" onClick={remove} className="delete-button">Delete</button>
    </div>
  );
};

export default ExperienceForm;
