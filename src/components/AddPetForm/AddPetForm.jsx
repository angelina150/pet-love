import React, { useEffect, useRef, useState } from "react";
import css from "./AddPetForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNoticesSpecies } from "../../redux/notices/selectors.js";
import { fetchNoticesSpecies } from "../../redux/notices/operations.js";
import { addPets, fetchUserFullInfo } from "../../redux/users/operations.js";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  imgURL: yup
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

const AddPetForm = () => {
  const dispatch = useDispatch();
  const types = useSelector(selectNoticesSpecies);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const fileInputRef = useRef(null);
  const [imgURL, setImgURL] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (types.length === 0) {
      dispatch(fetchNoticesSpecies());
    }
  }, [dispatch, types]);

  const options = ["female", "male", "multiple"];
  const [gender, setGender] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const titleValue = watch("title");
  const nameValue = watch("name");
  const imgURLValue = watch("imgURL");
  const speciesValue = watch("species");
  const birthdayValue = watch("birthday");

  const handleSelectType = (type) => {
    setSelectedType(type);
    setValue("species", type);
    setIsDropdownOpen(false);
  };

  const handleGenderChange = (option) => {
    setGender(option);
    setValue("sex", option);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(addPets(data));
      await dispatch(fetchUserFullInfo());
      toast.success("Pet added successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error || "Failed to add pet. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pet-love");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxmqb54k2/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImgURL(data.secure_url);
      setValue("imgURL", data.secure_url);
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      toast.error(error || "Failed to upload image.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <h2 className={css.title}>
        Add my pet / <span className={css.titlePath}>Personal details</span>
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
              className={css.inputGender}
            />
            <svg className={css.icon}>
              <use href={`/images/icons.svg#icon-${option}`}></use>
            </svg>
            {errors.sex && <p className={css.error}>{errors.sex.message}</p>}
          </label>
        ))}
      </div>

      {imgURLValue ? (
        <img src={imgURLValue} alt="Animal's foot" className={css.imgAnimal} />
      ) : (
        <div className={css.svgAnimal}>
          <svg className={css.iconAnimal}>
            <use href="/images/icons.svg#icon-footprint"></use>
          </svg>
        </div>
      )}

      <div className={css.inputWrapper}>
        <div className={css.inputImgWrapper}>
          <input
            {...register("imgURL")}
            placeholder="Enter URL"
            className={`${css.inputTextImg} ${imgURLValue ? css.filled : ""}`}
          />
          {errors.imgURL && (
            <p className={css.error}>{errors.imgURL.message}</p>
          )}
          <button
            className={css.btnUpload}
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            Upload photo
            <svg className={css.iconUpload}>
              <use href="/images/icons.svg#icon-upload-cloud"></use>
            </svg>
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </div>

        <input
          {...register("title")}
          placeholder="Title"
          className={`${css.inputText} ${titleValue ? css.filled : ""}`}
        />
        {errors.title && <p className={css.error}>{errors.title.message}</p>}

        <input
          {...register("name")}
          placeholder="Pet’s Name"
          className={`${css.inputText} ${nameValue ? css.filled : ""}`}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}

        <div className={css.inputDownWrapper}>
          <input
            {...register("birthday")}
            type="date"
            className={`${css.inputText} ${birthdayValue ? css.filled : ""}`}
          />
          {errors.birthday && (
            <p className={css.error}>{errors.birthday.message}</p>
          )}

          <div className={css.dropdownWrapper}>
            <input
              {...register("species")}
              placeholder="Type of pet"
              className={`${css.inputText} ${speciesValue ? css.filled : ""}`}
              value={selectedType}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setValue("species", e.target.value);
              }}
            />
            {isDropdownOpen && (
              <ul className={css.dropdownMenu}>
                {types?.map((type, index) => (
                  <li
                    key={index}
                    className={css.dropdownItem}
                    onClick={() => handleSelectType(type)}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.species && (
            <p className={css.error}>{errors.species.message}</p>
          )}
        </div>
      </div>

      <div className={css.buttons}>
        <button
          type="button"
          onClick={handleBack}
          className={`${css.backButton} ${css.btn}`}
        >
          Back
        </button>
        <button type="submit" className={`${css.submitButton} ${css.btn}`}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPetForm;
