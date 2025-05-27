import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import Title from "../../components/Title/Title.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";
import { Link } from "react-router-dom";
const RegistrationPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.petBlockWrapper}>
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
        <div className={css.petBlock}>
          <div className={css.petBlockImgWrapper}>
            <img className={css.petBlockImg} src="/images/cat.png" alt="Cat" />
          </div>
          <h2 className={css.petBlockTitle}>Jack</h2>
          <p className={css.petBlockBirth}>
            Birthday:
            <span className={css.petBlockBirthPart}>18.10.2021</span>
          </p>
          <p className={css.petBlockDesc}>
            Jack is a gray Persian cat with green eyes. He loves to be pampered
            and groomed, and enjoys playing with toys.
          </p>
        </div>
      </div>
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
