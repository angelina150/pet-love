import React from "react";
import AddPet from "../AddPet/AddPet.jsx";
import PetsList from "../PetsList/PetsList.jsx";

const PetsBlock = () => {
  return (
    <div>
      <h3>My pets</h3>
      <AddPet />
      <PetsList />
    </div>
  );
};

export default PetsBlock;
