import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import Title from "../../components/Title/Title.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";
import { Link } from "react-router-dom";
const RegistrationPage = () => {
  return (
    <div className={css.wrapper}>
      <PetBlock
        sources={[
          {
            media: "(min-width: 1280px)",
            srcSet:
              "/images/registration/desc-register-1x.jpg 1x, /images/registration/desc-register-2x.jpg 2x",
          },
          {
            media: "(min-width: 768px)",
            srcSet:
              "/images/registration/tab-register-1x.jpg 1x, /images/registration/tab-register-2x.jpg 2x",
          },
          {
            media: "(min-width: 320px)",
            srcSet:
              "/images/registration/mob-register-1x.jpg 1x, /images/registration/mob-register-2x.jpg 2x",
          },
        ]}
        defaultImage="/images/registration/mob-register-1x.jpg"
        altText="Cat"
      />
      <div className={css.formWrapper}>
        <Title>Registration</Title>
        <p className={css.descTitle}>
          Thank you for your interest in our platform.
        </p>
        <RegistrationForm />
        <p className={css.desc}>
          Already have an account?
          <Link to="/login" className={css.descPath}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
