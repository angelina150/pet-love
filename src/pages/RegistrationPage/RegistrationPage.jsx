import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import Title from "../../components/Title/Title.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";
import { Link } from "react-router-dom";
const RegistrationPage = () => {
  return (
    <div>
      <PetBlock />
      <div className={css.formWrapper}>
        <Title>Registration</Title>
        <p className={css.descTitle}>
          Thank you for your interest in our platform.
        </p>
        <RegistrationForm />
        <p className={css.desc}>
          Already have an account?{" "}
          <Link to="/login" className={css.descPath}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
