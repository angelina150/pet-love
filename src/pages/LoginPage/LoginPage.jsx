import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import Title from "../../components/Title/Title.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className={css.wrapper}>
      <PetBlock
        sources={[
          {
            media: "(min-width: 1280px)",
            srcSet:
              "/images/login/login-desc-1x.jpg 1x, /images/login/login-desc-2x.jpg 2x",
          },
          {
            media: "(min-width: 768px)",
            srcSet:
              "/images/login/tab-login-1x.jpg 1x, /images/login/tab-login-2x.jpg 2x",
          },
          {
            media: "(min-width: 320px)",
            srcSet:
              "/images/login/mob-login-1x.jpg 1x, /images/login/mob-login-2x.jpg 2x",
          },
        ]}
        defaultImage="/images/login/mob-login-1x.jpg"
        altText="Corgi"
      />
      <div className={css.formWrapper}>
        <Title>Log in</Title>
        <p className={css.descTitle}>
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <LoginForm />
        <p className={css.desc}>
          Don't have an account?
          <Link to="/register" className={css.descPath}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
