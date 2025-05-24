import React from "react";
import PetBlock from "../../components/PetBlock/PetBlock.jsx";
import AddPetForm from "../../components/AddPetForm/AddPetForm.jsx";
import css from "./AddPetPage.module.css";
const AddPetPage = () => {
  return (
    <div className={css.wrapper}>
      <PetBlock
        sources={[
          {
            media: "(min-width: 1280px)",
            srcSet:
              "/images/addPetBlock/add-pet-desc.jpg 1x, /images/addPetBlock/add-pet-desc@2x.jpg 2x",
          },
          {
            media: "(min-width: 768px)",
            srcSet:
              "/images/addPetBlock/add-pet-tab.jpg 1x, /images/addPetBlock/add-pet-tab@2x.jpg 2x",
          },
          {
            media: "(min-width: 320px)",
            srcSet:
              "/images/addPetBlock/add-pet-mob 1x, /images/addPetBlock/add-pet-mob@2x.jpg 2x",
          },
        ]}
        defaultImage="/images/addPetBlock/add-pet-mob.jpg"
        altText="Dog"
      />
      <AddPetForm />
    </div>
  );
};

export default AddPetPage;
