import React, { useEffect, useRef, useState } from 'react';
import css from './AddPetForm.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectNoticesSpecies } from '../../redux/notices/selectors';
import { fetchNoticesSpecies } from '../../redux/notices/operations';
import { addPets, fetchUserFullInfo } from '../../redux/users/operations';
import { useClickAway } from 'react-use';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  name: yup.string().required('Name is required'),
  imgURL: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Invalid image format'
    )
    .required('Image URL is required'),
  species: yup.string().required('Species is required'),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid birthday format')
    .required('Birthday is required'),
  sex: yup.string().required('Sex is required'),
});

const AddPetForm = () => {
  const dispatch = useDispatch();
  const types = useSelector(selectNoticesSpecies);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const fileInputRef = useRef(null);
  const [imgURL, setImgURL] = useState('');
  const [birthday, setBirthday] = useState(null);
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);
  useClickAway(calendarRef, () => setShowCalendar(false));
  useClickAway(dropdownRef, () => setIsDropdownOpen(false));
  const genderOptions = ['female', 'male', 'multiple'];
  const [gender, setGender] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const titleValue = watch('title');
  const nameValue = watch('name');
  const imgURLValue = watch('imgURL');
  const speciesValue = watch('species');

  useEffect(() => {
    if (types.length === 0) {
      dispatch(fetchNoticesSpecies());
    }
  }, [dispatch, types]);

  const handleSelectType = type => {
    setSelectedType(type);
    setValue('species', type);
    setIsDropdownOpen(false);
  };

  const handleGenderChange = option => {
    setGender(option);
    setValue('sex', option);
  };

  const handleUpload = async event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pet-love');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxmqb54k2/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setImgURL(data.secure_url);
      setValue('imgURL', data.secure_url);
      toast.success('Photo uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image.');
    }
  };

  const onSubmit = async data => {
    try {
      await dispatch(addPets(data));
      await dispatch(fetchUserFullInfo());
      toast.success('Pet added successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to add pet. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <h2 className={css.title}>
        Add my pet / <span className={css.titlePath}>Personal details</span>
      </h2>

      <div className={css.inputWrapperGender}>
        <div className={css.genderWrapper}>
          {genderOptions.map(option => (
            <label
              key={option}
              className={`${css[`label-${option}`]} ${
                gender === option ? css.active : ''
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
            </label>
          ))}
        </div>
        {errors?.sex && (
          <p className={`${css.error} ${css.errorGender}`}>
            {errors?.sex?.message}
          </p>
        )}
      </div>

      {imgURLValue ? (
        <img
          src={imgURLValue}
          loading="lazy"
          alt="Animal"
          className={css.imgAnimal}
        />
      ) : (
        <div className={css.svgAnimal}>
          <svg className={css.iconAnimal}>
            <use href="/images/icons.svg#icon-footprint"></use>
          </svg>
        </div>
      )}

      <div className={css.inputsWrapper}>
        <div className={css.inputWrapper}>
          <div className={css.inputImgWrapper}>
            <input
              {...register('imgURL')}
              placeholder="Enter URL"
              className={`${css.inputTextImg} ${imgURLValue ? css.filled : ''}`}
            />
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
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
          </div>
          {errors.imgURL && (
            <p className={css.error}>{errors.imgURL.message}</p>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            {...register('title')}
            placeholder="Title"
            className={`${css.inputText} ${titleValue ? css.filled : ''}`}
          />

          {errors?.title && (
            <p className={css.error}>{errors?.title?.message}</p>
          )}
        </div>

        <div className={css.inputWrapper}>
          <input
            {...register('name')}
            placeholder="Pet’s Name"
            className={`${css.inputText} ${nameValue ? css.filled : ''}`}
          />
          {errors?.name && <p className={css.error}>{errors?.name?.message}</p>}
        </div>

        <div className={css.inputDownWrapper}>
          <div className={css.inputDateWrapper} ref={calendarRef}>
            <input
              type="text"
              placeholder="00.00.0000"
              value={birthday ? format(birthday, 'dd.MM.yyyy') : ''}
              onFocus={() => setShowCalendar(true)}
              className={`${css.inputText} ${birthday ? css.filled : ''}`}
            />
            <svg
              className={css.iconCalendar}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <use href="/images/icons.svg#icon-calendar"></use>
            </svg>
            {showCalendar && (
              <DatePicker
                selected={birthday}
                onChange={date => {
                  setBirthday(date);
                  const formatted = format(date, 'yyyy-MM-dd');
                  setValue('birthday', formatted);
                  setShowCalendar(false);
                }}
                dateFormat="dd.MM.yyyy"
                inline
              />
            )}
            {errors?.birthday && (
              <p className={css.error}>{errors?.birthday?.message}</p>
            )}
          </div>

          <div className={css.dropdownWrapper} ref={dropdownRef}>
            <input
              {...register('species')}
              placeholder="Type of pet"
              className={`${css.inputText} ${speciesValue ? css.filled : ''}`}
              value={selectedType}
              onChange={e => {
                setSelectedType(e.target.value);
                setValue('species', e.target.value);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            <svg
              className={`${css.iconDropdown} ${
                isDropdownOpen ? css.iconDropdownOpen : ''
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <use href="/images/icons.svg#icon-chevron-down"></use>
            </svg>
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
            {errors?.species && (
              <p className={css.error}>{errors?.species?.message}</p>
            )}
          </div>
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
