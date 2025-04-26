import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
import { fetchUserFullInfo } from "../../redux/users/operations.js";
import PetsItem from "../PetsItem/PetsItem.jsx";

const PetsList = () => {
  // const dispatch = useDispatch();
  const userFullInfo = useSelector(selectUserFullInfo);
  // useEffect(() => {
  //   dispatch(fetchUserFullInfo());
  // }, [dispatch]);
  const pets = userFullInfo?.pets;

  return (
    <ul>
      {pets &&
        pets.map((pet) => {
          return <PetsItem key={pet.id} pet={pet} />;
        })}
    </ul>
  );
};

export default PetsList;
