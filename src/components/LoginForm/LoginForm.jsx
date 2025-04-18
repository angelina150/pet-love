import React, { useState } from "react";
import * as yup from "yup";
import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";
import { loginUser } from "../../redux/users/operations.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
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
});

const LoginForm = () => {
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
      email: values.email,
      password: values.password,
    };

    try {
      await dispatch(loginUser(data)).unwrap();
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
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
