import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
import { fetchUserFullInfo } from "../../redux/users/operations.js";
import PetsItem from "../PetsItem/PetsItem.jsx";
import css from "./PetsList.module.css";
const PetsList = () => {
  const dispatch = useDispatch();
  const userFullInfo = useSelector(selectUserFullInfo);
  useEffect(() => {
    if (!userFullInfo) {
      dispatch(fetchUserFullInfo());
    }
  }, [dispatch, userFullInfo]);
  const pets = userFullInfo?.pets;

  return (
    <ul className={css.list}>
      {pets &&
        pets.map((pet) => {
          return <PetsItem key={pet._id} pet={pet} />;
        })}
    </ul>
  );
};

export default PetsList;
