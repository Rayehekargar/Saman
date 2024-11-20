import React, { useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/InputField";
import ExperienceForm from "../components/ExperienceField";
import SubmitButton from "../components/SubmitButton";
import "../shared/UserInfoForm.css";
import { Plus } from "react-feather";
import { User } from "react-feather";
import { Briefcase } from "react-feather";

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

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    preferredContactMethod: Yup.string()
      .oneOf(["email", "phone"])
      .required("Preferred contact method is required"),
    email: Yup.string()
      .email("Invalid email")
      .when("preferredContactMethod", {
        is: "email",
        then: Yup.string().required("Email is required"),
        otherwise: Yup.string().notRequired(),
      }),
    phone: Yup.string()
      .strict()
      .when("preferredContactMethod", {
        is: "phone",
        then: Yup.string()
          .required("Phone number is required")
          .matches(/^\d{11}$/, "Phone number must be 11 digits"),
        otherwise: Yup.string().notRequired(),
      }),
      address: Yup.string().notRequired(),
    experiences: Yup.array().of(
      Yup.object().shape({
        role: Yup.string().required("Role is required"),
        duration: Yup.string().required("Duration is required"),
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
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addExperience = () => {
    append({ role: "", duration: "" });
  };

  const onSubmit = (data: any) => {
    console.log(data);
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
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
        <div className="div-heaer-user"> 
        <User size={16} color="#4A5568" />
          <span>اطلاعات فردی</span>
        </div>
        <InputField
          label="نام"
          name="firstName"
          type="text"
          register={register}
          required={true}
          error={errors.firstName}
        />
        <InputField
          label="نام خانوادگی"
          name="lastName"
          type="text"
          register={register}
          required={true}
          error={errors.lastName}
        />

        <div className="preferedContact">
          <h4> انتخاب روش تماس</h4>
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
                ایمیل
                <input
                  {...field}
                  type="radio"
                  value="phone"
                  checked={preferredContactMethod === "phone"}
                  onChange={() => handleContactMethodChange("phone")}
                />{" "}
                تلفن
              </div>
            )}
          />
      

        {preferredContactMethod === "email" && (
          <InputField
            label="ایمیل"
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
            label="تلفن"
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
          <label>آدرس</label>
          <textarea {...register("address")} className={errors.address ? 'error' : ''} />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div>
        <div className="div-heaer-experience"> 
        <Briefcase size={16} color="#4A5568" />
           <span>تجربه های کاری</span>
          
        </div>
          {fields.map((item, index) => (
            <ExperienceForm
              key={item.id}
              index={index}
              remove={() => remove(index)}
            />
          ))}
          <button type="button" className="experience-button" onClick={addExperience}>
          <Plus size={14} />
          </button>
          <span>افزودن </span>
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
