import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./AddPet.module.css";

const AddPet = () => {
  const navigate = useNavigate();

  return (
    <button className={css.btn} onClick={() => navigate("/add-pet")}>
      Add pet
      <svg className={css.icon}>
        <use href="/images/icons.svg#icon-close"></use>
      </svg>
    </button>
  );
};

export default AddPet;
