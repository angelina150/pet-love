import React from "react";
import css from "./AuthNav.module.css";
import { useNavigate } from "react-router-dom";
const AuthNav = () => {
  const navigate = useNavigate();
  return (
    <div className={css.wrapper}>
      <button
        className={css.btnLogin}
        onClick={() => {
          navigate("/login");
        }}
      >
        Log in
      </button>
      <button
        className={css.btnRegister}
        onClick={() => {
          navigate("/register");
        }}
      >
        Registration
      </button>
    </div>
  );
};

export default AuthNav;
