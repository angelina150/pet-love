import React, { useState } from "react";
import css from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/users/operations.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
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
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      await dispatch(registerUser(data)).unwrap();
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  return (
    <form className={css.formRegisrt} onSubmit={handleSubmit(onSubmit)}>
      <label>
        {errors.name && (
          <span className={css.error}>{errors.name.message}</span>
        )}
        <input
          className={`${css.input} ${
            errors.name ? css.inputError : watch("name") ? css.inputSuccess : ""
          }`}
          {...register("name")}
          placeholder="Name"
        />
      </label>
      <label>
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
        <input
          {...register("email")}
          className={`${css.input} ${
            errors.email
              ? css.inputError
              : watch("email")
              ? css.inputSuccess
              : ""
          }`}
          placeholder="Email"
        />
      </label>
      <label className={css.labelPassword}>
        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}
        <input
          placeholder="Password"
          className={`${css.input} ${
            errors.password
              ? css.inputError
              : watch("password")
              ? css.inputSuccess
              : ""
          }`}
          type={showPassword.password ? "text" : "password"}
          {...register("password")}
        />

        <PasswordToggleButton
          isVisible={showPassword.password}
          onClick={() =>
            setShowPassword((prev) => ({
              ...prev,
              password: !prev.password,
            }))
          }
        />
      </label>
      <label className={css.labelConfirmPassword}>
        {errors.confirmPassword && (
          <span className={css.error}>{errors.confirmPassword.message}</span>
        )}
        <input
          placeholder="Confirm password"
          className={`${css.input} ${
            errors.confirmPassword
              ? css.inputError
              : watch("confirmPassword")
              ? css.inputSuccess
              : ""
          }`}
          type={showPassword.confirmPassword ? "text" : "password"}
          {...register("confirmPassword")}
        />

        <PasswordToggleButton
          isVisible={showPassword.confirmPassword}
          onClick={() =>
            setShowPassword((prev) => ({
              ...prev,
              confirmPassword: !prev.confirmPassword,
            }))
          }
        />
      </label>

      <button className={css.btnSubmit} type="submit">
        Registration
      </button>
    </form>
  );
};

export default RegistrationForm;
