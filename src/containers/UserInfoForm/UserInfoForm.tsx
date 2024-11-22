import React, { useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/InputField/InputField";
import ExperienceForm from "../../components/ExperienceField/ExperienceField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "./UserInfoForm.css";
import { Plus } from "react-feather";
import { User } from "react-feather";
import { Briefcase } from "react-feather";
import {fa} from '../../shared/i18n/fa'
import Modal from '../../components/Modal/Modal';

interface UserInfoFormProps {}

interface FormValues {
  firstName: string;
  lastName: string;
  preferredContactMethod: "email" | "phone";
  email?: string;
  phone?: string; 
  experiences: { role: string; duration: string }[];
  address?: string; 
}

const UserInfoForm: React.FC<UserInfoFormProps> = () => {
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    "email" | "phone"
  >("email");

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState<number | null>(null);
  const [selectedRole,setSelectedRole]=useState<string | null>(null);

  const schema = Yup.object().shape({
    firstName: Yup.string().required(fa.containers.userInfoForm.firstNameRequired),
    lastName: Yup.string().required(fa.containers.userInfoForm.lastNameRequired),
    preferredContactMethod: Yup.string()
      .oneOf(["email", "phone"])
      .required("Preferred contact method is required"),
    email: Yup.string()
      .email(fa.containers.userInfoForm.emailValidation)
      .when("preferredContactMethod", {
        is: "email",
        then: Yup.string().required(fa.containers.userInfoForm.emailRequired),
        otherwise: Yup.string().notRequired(),
      }),
    phone: Yup.string()
      .strict()
      .when("preferredContactMethod", {
        is: "phone",
        then: Yup.string()
          .required(fa.containers.userInfoForm.phoneRequired)
          .matches(/^\d{11}$/, fa.containers.userInfoForm.phoneValidation),
        otherwise: Yup.string().notRequired(),
      }),
      address: Yup.string().notRequired(),
    experiences: Yup.array().of(
      Yup.object().shape({
        role: Yup.string().required(fa.containers.userInfoForm.jobTitleRequired),
        duration: Yup.string().required(fa.containers.userInfoForm.durationRequired),
      })
    ),
  });


  const methods = useForm<FormValues>({
    resolver: yupResolver(schema) as unknown as any,
    defaultValues: {
      preferredContactMethod: "email",
      experiences: [],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
     getValues
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addExperience = () => {
    append({ role: "", duration: "" });
  };

  const handleContactMethodChange = (method: "email" | "phone") => {
    setPreferredContactMethod(method);
    setValue("preferredContactMethod", method, { shouldValidate: true });
    trigger(["email", "phone"]);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 11) {
      setValue("phone", value);
      trigger("phone");
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("email", value); 
    trigger("email"); 
  }
  const openModal = (index: number) => {
    const role = getValues(`experiences.${index}.role`);
    setSelectedRole(role); 
    setSelectedExperienceIndex(index);
    setModalOpen(true); 
  };
  const closeModal = () => setModalOpen(false);
  const handleConfirmDelete = () => {
    if (selectedExperienceIndex !== null) {
      remove(selectedExperienceIndex);
    }
    closeModal();   
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">

      <Modal
        isOpen={isModalOpen}
        title={fa.components.modal.confirmDeleteTitle}
        message={`${fa.components.modal.confirmDeleteMessage} ${selectedRole || ''}؟`}
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
      />

        <div className="div-heaer-user"> 
        <User size={16} color="#4A5568" />
          <span>{fa.containers.userInfoForm.userInformation}</span>
        </div>
        <InputField
          label={fa.containers.userInfoForm.firstName}
          name="firstName"
          type="text"
          register={register}
          required={true}
          error={errors.firstName}
        />
        <InputField
          label={fa.containers.userInfoForm.lastName}
          name="lastName"
          type="text"
          register={register}
          required={true}
          error={errors.lastName}
        />

        <div className="preferedContact">
          <h3>{fa.containers.userInfoForm.preferedContact}</h3>
          <Controller
            name="preferredContactMethod"
            control={control}
            render={({ field }) => (
              <div className="radio-group">
                <input
                  {...field}
                  type="radio"
                  value="email"
                  checked={preferredContactMethod === "email"}
                  onChange={() => handleContactMethodChange("email")}
                />{" "}
                {fa.containers.userInfoForm.email}
                <input
                  {...field}
                  type="radio"
                  value="phone"
                  checked={preferredContactMethod === "phone"}
                  onChange={() => handleContactMethodChange("phone")}
                />{" "}
                {fa.containers.userInfoForm.phone}
              </div>
            )}
          />
      

        {preferredContactMethod === "email" && (
          <InputField
            label={fa.containers.userInfoForm.email}
            name="email"
            type="email"
            register={register}
            required={true}
            handleChange={handleEmailChange}
            error={errors.email}
          />
        )}

        {preferredContactMethod === "phone" && (
          <InputField
            label={fa.containers.userInfoForm.phone}
            name="phone"
            type="tel"
            register={register}
            required={true}
            handleChange={handlePhoneChange}
            error={errors.phone}
          />
        )}
  </div>
        <div className="div-textarea">
          <label>{fa.containers.userInfoForm.address}</label>
          <textarea {...register("address")} className={errors.address ? 'error' : ''} />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div>
        <div className="div-heaer-experience"> 
        <Briefcase size={16} color="#4A5568" />
           <span>{fa.containers.userInfoForm.experiences}</span>
          
        </div>
        <button type="button" className="experience-button" onClick={addExperience}>
          <Plus size={14} />
          </button>
          <span>{fa.containers.userInfoForm.add}</span>

          {fields.map((item, index) => (
            <ExperienceForm
              key={item.id}
              index={index}
              remove={() => openModal(index)}
            />
          ))}
        
        </div>
      <div className="div-submit">
        <SubmitButton
          type="submit"
          isDisabled={Object.keys(errors).length > 0}
        />
        </div>
      </form>
    </FormProvider>
  );
};

export default UserInfoForm;
