import React, { useState } from "react";
import * as yup from "yup";
import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data); // тут можна додати логіку логіну
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={css.formRegisrt} onSubmit={handleSubmit(onSubmit)}>
      <label>
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
        <input
          {...register("email")}
          placeholder="Email"
          className={`${css.input} ${
            errors.email
              ? css.inputError
              : watch("email")
              ? css.inputSuccess
              : ""
          }`}
        />
      </label>

      <label className={css.labelPassword}>
        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}
        <input
          {...register("password")}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className={`${css.input} ${
            errors.password
              ? css.inputError
              : watch("password")
              ? css.inputSuccess
              : ""
          }`}
        />
        <PasswordToggleButton
          isVisible={showPassword}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </label>

      <button className={css.btnSubmit} type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
