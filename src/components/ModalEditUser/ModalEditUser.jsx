import React, { useEffect } from "react";
import Modal from "react-modal";
import css from "./ModalEditUser.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserFullInfo, updateUser } from "../../redux/users/operations.js";
import { selectUserFullInfo } from "../../redux/users/selectors.js";

Modal.setAppElement("#root");

const schema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    ),
  avatar: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid avatar format"
    ),
  phone: yup.string().matches(/^\+38\d{10}$/, "Invalid phone format"),
});

const ModalEditUser = ({ onClose, isOpen }) => {
  const dispatch = useDispatch();
  const userFullInfo = useSelector(selectUserFullInfo);
  useEffect(() => {
    dispatch(fetchUserFullInfo());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getChangedFields = (original, updated) => {
    const changed = {};
    for (const key in updated) {
      if (updated[key] !== "" && updated[key] !== original[key]) {
        changed[key] = updated[key];
      }
    }
    return changed;
  };

  const onSubmit = async (values) => {
    const changedFields = getChangedFields(userFullInfo, values);

    if (Object.keys(changedFields).length === 0) {
      toast.info("Немає змін для оновлення");
      return;
    }

    try {
      await dispatch(updateUser(changedFields)).unwrap();
      toast.success("Дані оновлено успішно!");
      onClose();
    } catch (error) {
      toast.error(error.message || "Помилка при оновленні");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button type="button" className={css.btnClose} onClick={onClose}>
        <svg width="24" height="24" className={css.iconClose}>
          <use href="/images/icons.svg#icon-close"></use>
        </svg>
      </button>
      <h2 className={css.title}>Edit information</h2>

      <form className={css.formEdit} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.labelAvatar}>
          <input
            defaultValue={userFullInfo?.avatar}
            placeholder="Avatar URL"
            className={css.input}
            {...register("avatar")}
          />

          {errors.avatar && (
            <span className={css.error}>{errors.avatar.message}</span>
          )}
        </label>
        <button>
          Upload photo
          <svg width="18" height="18" className={css.iconUpload}>
            <use href="/images/icons.svg#icon-upload-cloud"></use>
          </svg>
        </button>

        <label>
          <input
            defaultValue={userFullInfo?.name}
            className={css.input}
            {...register("name")}
            placeholder="Name"
          />

          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </label>

        <label>
          <input
            defaultValue={userFullInfo?.email}
            {...register("email")}
            className={css.input}
            placeholder="Email"
          />

          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </label>

        <label className={css.label}>
          <input
            defaultValue={userFullInfo?.phone}
            placeholder="Phone"
            className={css.input}
            {...register("phone")}
          />

          {errors.phone && (
            <span className={css.error}>{errors.phone.message}</span>
          )}
        </label>

        <button type="submit" className={css.btnYes}>
          Save
        </button>
      </form>
    </Modal>
  );
};

export default ModalEditUser;
