import React, { useState } from "react";
import css from "./RegistrationForm.module.css";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";
import { useDispatch } from "react-redux";
import {
  fetchUserFullInfo,
  registerUser,
} from "../../redux/users/operations.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ValidatedInput from "../ValidatedInput/ValidatedInput.jsx";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Enter a valid Email"
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchedFields = useWatch({
    control,
    name: ["name", "email", "password", "confirmPassword"],
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const onSubmit = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      await dispatch(registerUser(data)).unwrap();
      await dispatch(fetchUserFullInfo()).unwrap();
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error?.message || "Registration failed");
    }
  };

  return (
    <form className={css.formRegister} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputsWrapper}>
        <ValidatedInput
          name="name"
          register={register}
          errors={errors}
          watchValue={watchedFields[0]}
          placeholder="Name"
        />

        <ValidatedInput
          name="email"
          register={register}
          errors={errors}
          watchValue={watchedFields[1]}
          placeholder="Email"
        />

        <ValidatedInput
          name="password"
          register={register}
          errors={errors}
          watchValue={watchedFields[2]}
          placeholder="Password"
          type={showPassword.password ? "text" : "password"}
          showPasswordToggle={true}
          isPasswordField={true}
          passwordVisible={showPassword.password}
          togglePasswordVisibility={() =>
            setShowPassword((prev) => ({ ...prev, password: !prev.password }))
          }
        />

        <ValidatedInput
          name="confirmPassword"
          register={register}
          errors={errors}
          watchValue={watchedFields[3]}
          placeholder="Confirm password"
          type={showPassword.confirmPassword ? "text" : "password"}
          showPasswordToggle={true}
          isPasswordField={true}
          passwordVisible={showPassword.confirmPassword}
          togglePasswordVisibility={() =>
            setShowPassword((prev) => ({
              ...prev,
              confirmPassword: !prev.confirmPassword,
            }))
          }
        />
      </div>

      <button className={css.btnSubmit} type="submit">
        Registration
      </button>
    </form>
  );
};

export default RegistrationForm;
