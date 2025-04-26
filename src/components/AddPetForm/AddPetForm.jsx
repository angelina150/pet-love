import React, { useState } from "react";
import css from "./AddPetForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  imgUrl: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid image format"
    )
    .required("Image URL is required"),
  species: yup.string().required("Species is required"),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid birthday format (YYYY-MM-DD)")
    .required("Birthday is required"),
  sex: yup.string().required("Sex is required"),
});

const options = ["female", "male", "multiple"];

const AddPetForm = () => {
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGenderChange = (option) => {
    setGender(option);
    setValue("sex", option);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      toast.success("Pet added successfully!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add pet. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <h2>
        Add my pet / <span>Personal details</span>
      </h2>

      <div className={css.genderWrapper}>
        {options.map((option) => (
          <label
            key={option}
            className={`${css[`label-${option}`]} ${
              gender === option ? css.active : ""
            }`}
          >
            <input
              type="radio"
              name="sex"
              value={option}
              checked={gender === option}
              onChange={() => handleGenderChange(option)}
              className={css.input}
            />
            <svg className={css.icon} width="24" height="24">
              <use href={`/images/icons.svg#icon-${option}`}></use>
            </svg>
          </label>
        ))}
      </div>
      {errors.sex && <p className={css.error}>{errors.sex.message}</p>}

      <input
        {...register("title")}
        placeholder="Title"
        className={css.inputText}
      />
      {errors.title && <p className={css.error}>{errors.title.message}</p>}

      <input
        {...register("name")}
        placeholder="Pet's Name"
        className={css.inputText}
      />
      {errors.name && <p className={css.error}>{errors.name.message}</p>}

      <input
        {...register("imgUrl")}
        placeholder="Enter URL"
        className={css.inputText}
      />
      {errors.imgUrl && <p className={css.error}>{errors.imgUrl.message}</p>}

      <input
        {...register("species")}
        placeholder="Type of pet"
        className={css.inputText}
      />
      {errors.species && <p className={css.error}>{errors.species.message}</p>}

      <input
        {...register("birthday")}
        placeholder="00.00.0000"
        className={css.inputText}
      />
      {errors.birthday && (
        <p className={css.error}>{errors.birthday.message}</p>
      )}

      <div className={css.buttons}>
        <button type="button" onClick={handleBack} className={css.backButton}>
          Back
        </button>
        <button type="submit" className={css.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
