import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import AddPetForm from "../../components/AddPetForm/AddPetForm.jsx";
import css from "./AddPetPage.module.css";
const AddPetPage = () => {
  return (
    <div className={css.wrapper}>
      <PetBlock imageUrl={"/images/addPet.jpg"} altText={"Dog"} />
      <AddPetForm />
    </div>
  );
};

export default AddPetPage;
