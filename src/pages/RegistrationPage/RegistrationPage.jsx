import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import Title from "../../components/Title/Title.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";
const RegistrationPage = () => {
  return (
    <div>
      <PetBlock />
      <Title>Registration</Title>
      <p className={css.descTitle}>
        Thank you for your interest in our platform.
      </p>
      <RegistrationForm />
      <p className={css.desc}>
        Already have an account? <span className={css.descPath}>Login</span>
      </p>
    </div>
  );
};

export default RegistrationPage;
