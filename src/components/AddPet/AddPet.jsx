import React from "react";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/add-pet")}>Add pet +</button>;
};

export default AddPet;
