import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./AddPet.module.css";

const AddPet = () => {
  const navigate = useNavigate();

  return (
    <button className={css.btn} onClick={() => navigate("/add-pet")}>
      Add pet +
    </button>
  );
};

export default AddPet;
