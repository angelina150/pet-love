import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import css from "./ModalEditUser.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserFullInfo, updateUser } from "../../redux/users/operations.js";
import { selectUserFullInfo } from "../../redux/users/selectors.js";

Modal.setAppElement("#root");

const schema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .test(
      "email",
      "Invalid email format",
      (value) =>
        !value || /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
    ),
  avatar: yup
    .string()
    .test(
      "avatar",
      "Invalid avatar format",
      (value) =>
        !value ||
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/.test(value) ||
        value.startsWith("blob:")
    ),
  phone: yup
    .string()
    .test(
      "phone",
      "Invalid phone format",
      (value) => !value || /^\+38\d{10}$/.test(value)
    ),
});

const ModalEditUser = ({ onClose, isOpen }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const userFullInfo = useSelector(selectUserFullInfo);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userFullInfo) {
      reset({
        name: userFullInfo.name || "",
        email: userFullInfo.email || "",
        avatar: userFullInfo.avatar || "",
        phone: userFullInfo.phone || "",
      });
    }
  }, [userFullInfo, reset]);

  const getChangedFields = (original, updated) => {
    const changed = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        changed[key] = updated[key];
      }
    }
    return changed;
  };

  const onSubmit = async (values) => {
    const changedFields = getChangedFields(userFullInfo, values);

    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected!");
      return;
    }

    const formData = new FormData();

    for (const key in changedFields) {
      formData.append(key, changedFields[key]);
    }

    if (values.avatar && values.avatar.startsWith("blob:")) {
      const file = values.avatar;
      formData.append("avatar", file);
    } else if (values.avatar) {
      formData.append("avatar", values.avatar);
    }

    try {
      await dispatch(updateUser(formData)).unwrap();
      dispatch(fetchUserFullInfo());
      toast.success("Data updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error.message || "Error while updating");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      onAfterOpen={() => {
        document.body.style.overflow = "hidden";
      }}
      onAfterClose={() => {
        document.body.style.overflow = "auto";
      }}
    >
      <button type="button" className={css.btnClose} onClick={onClose}>
        <svg width="24" height="24" className={css.iconClose}>
          <use href="/images/icons.svg#icon-close"></use>
        </svg>
      </button>

      <h2 className={css.title}>Edit information</h2>

      <form className={css.formEdit} onSubmit={handleSubmit(onSubmit)}>
        {userFullInfo?.avatar ? (
          <img
            className={css.img}
            src={userFullInfo.avatar}
            alt="User avatar"
          />
        ) : (
          <>
            <div className={css.iconUserWrap}>
              <svg width="50" height="50">
                <use href="/images/icons.svg#icon-user"></use>
              </svg>
            </div>
          </>
        )}
        <label className={css.labelAvatar}>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Avatar URL"
                className={css.input}
              />
            )}
          />
          {errors.avatar && (
            <span className={css.error}>{errors.avatar.message}</span>
          )}
          <button
            className={css.btnUpload}
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            Upload photo
            <svg width="18" height="18" className={css.iconUpload}>
              <use href="/images/icons.svg#icon-upload-cloud"></use>
            </svg>
          </button>
        </label>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setValue("avatar", file);
            }
          }}
        />
        {/* Name */}
        <label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="Name" className={css.input} />
            )}
          />
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </label>
        {/* Email */}
        <label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="name@gmail.com|"
                className={css.input}
              />
            )}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </label>
        {/* Phone */}
        <label className={css.label}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="Phone" className={css.input} />
            )}
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
