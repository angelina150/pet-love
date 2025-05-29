import React from "react";
import css from "./PetsItem.module.css";
import { formatDatePetsList } from "../../utils.js";
import { useDispatch } from "react-redux";
import { fetchUserFullInfo, removePet } from "../../redux/users/operations.js";
import { toast } from "react-toastify";
const PetsItem = ({ pet }) => {
  const dispatch = useDispatch();

  const deletePet = async (petId) => {
    try {
      await dispatch(removePet(petId)).unwrap();
      await dispatch(fetchUserFullInfo());
      toast.success("Pet removed");
    } catch (error) {
      toast.error(error || "Failed to delete pet");
    }
  };

  return (
    <li key={pet._id} className={css.item}>
      <img src={pet?.imgURL} alt={pet?.title} className={css.img} />
      <h3 className={css.title}>{pet?.title}</h3>
      <div className={css.infoWrapper}>
        <p className={css.name}>
          Name <span className={css.info}>{pet?.name}</span>
        </p>
        <p className={css.name}>
          Birthday
          <span className={css.info}>{formatDatePetsList(pet?.birthday)}</span>
        </p>
        <p className={css.name}>
          Sex <span className={css.info}>{pet?.sex}</span>
        </p>
        <p className={css.name}>
          Species <span className={css.info}>{pet?.species}</span>
        </p>
      </div>

      <button
        className={css.btn}
        type="button"
        onClick={() => deletePet(pet._id)}
      >
        <svg className={css.iconBtn}>
          <use href="/images/icons.svg#icon-trash"></use>
        </svg>
      </button>
    </li>
  );
};

export default PetsItem;
