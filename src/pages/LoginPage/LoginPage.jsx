import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import Title from "../../components/Title/Title.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <PetBlock />
      <div className={css.formWrapper}>
        <Title>Log in</Title>
        <p className={css.descTitle}>
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <LoginForm />
        <p className={css.desc}>
          Don't have an account?{" "}
          <Link to="/register" className={css.descPath}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
