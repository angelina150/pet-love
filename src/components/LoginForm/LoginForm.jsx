import React, { useState } from "react";
import * as yup from "yup";
import css from "./LoginForm.module.css";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";
import { fetchUserFullInfo, loginUser } from "../../redux/users/operations.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ValidatedInput from "../ValidatedInput/ValidatedInput.jsx";

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
  const [showPassword, setShowPassword] = useState(false);
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
    name: ["email", "password"],
  });
  const onSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      await dispatch(loginUser(data)).unwrap();
      await dispatch(fetchUserFullInfo()).unwrap();
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error?.message || "Login failed");
    }
  };

  return (
    <form className={css.formRegister} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputsWrapper}>
        <ValidatedInput
          name="email"
          register={register}
          errors={errors}
          watchValue={watchedFields[0]}
          placeholder="Email"
        />

        <ValidatedInput
          name="password"
          register={register}
          errors={errors}
          watchValue={watchedFields[1]}
          placeholder="Password"
          type={showPassword.password ? "text" : "password"}
          showPasswordToggle={true}
          isPasswordField={true}
          passwordVisible={showPassword.password}
          togglePasswordVisibility={() =>
            setShowPassword((prev) => ({ ...prev, password: !prev.password }))
          }
        />
      </div>

      <button className={css.btnSubmit} type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
