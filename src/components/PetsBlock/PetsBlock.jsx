import React from "react";
import AddPet from "../AddPet/AddPet.jsx";
import PetsList from "../PetsList/PetsList.jsx";
import css from "./PetsBlock.module.css";

const PetsBlock = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.titleWrapper}>
        <h3 className={css.title}>My pets</h3>
        <AddPet />
      </div>

      <PetsList />
    </div>
  );
};

export default PetsBlock;
