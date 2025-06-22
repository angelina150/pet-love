import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import css from './ModalEditUser.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserFullInfo, updateUser } from '../../redux/users/operations.js';
import { selectUserFullInfo } from '../../redux/users/selectors.js';
import { IMaskInput } from 'react-imask';
Modal.setAppElement('#root');

const schema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Email must be in a valid format (example@example.com)'
    ),
  avatar: yup
    .string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Avatar must be a valid image URL (png, jpg, jpeg, gif, bmp, webp)'
    ),
  phone: yup
    .string()
    .matches(
      /^\+38\d{10}$/,
      'Phone number must be in the format +380XXXXXXXXX'
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
      name: '',
      email: '',
      avatar: '',
      phone: '',
    },
  });
  const avatarValue = useWatch({ control, name: 'avatar' });
  useEffect(() => {
    if (userFullInfo) {
      reset({
        name: userFullInfo.name ?? '',
        email: userFullInfo.email ?? '',
        avatar: userFullInfo.avatar ?? '',
        phone: userFullInfo.phone ?? '',
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

  const onSubmit = async values => {
    const changedFields = getChangedFields(userFullInfo, values);
    if (Object.keys(changedFields).length === 0) {
      toast.info('No changes detected!');
      return;
    }
    try {
      await dispatch(updateUser(changedFields)).unwrap();
      await dispatch(fetchUserFullInfo());
      toast.success('Data updated successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Error while updating');
    }
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
      await dispatch(fetchUserFullInfo());
      setValue('avatar', data.secure_url);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image.');
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      onAfterOpen={() => {
        document.body.style.overflow = 'hidden';
      }}
      onAfterClose={() => {
        document.body.style.overflow = 'auto';
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className={css.btnClose}
        onClick={onClose}
        aria-label="Close modal"
      >
        <svg width="24" height="24" className={css.iconClose}>
          <use href="/images/icons.svg#icon-close"></use>
        </svg>
      </button>

      <h2 id="modal-title" className={css.title}>
        Edit information
      </h2>

      <form className={css.formEdit} onSubmit={handleSubmit(onSubmit)}>
        {avatarValue ? (
          <>
            <img
              className={css.img}
              src={avatarValue}
              alt="User avatar"
              loading="lazy"
            />
            <label className={css.labelAvatar}>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Avatar URL"
                    value={field.value || ''}
                    className={css.inputAvatar}
                    aria-invalid={Boolean(errors.avatar)}
                  />
                )}
              />
              {errors.avatar && (
                <span className={css.error} role="alert">
                  {errors.avatar.message}
                </span>
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
            </label>
          </>
        ) : (
          <>
            <div>
              <div className={css.iconUserWrap}>
                <svg width="40" height="40">
                  <use href="/images/icons.svg#icon-user"></use>
                </svg>
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className={css.btnUploadNoPhoto}
                type="button"
              >
                Upload photo
              </button>
            </div>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleUpload}
        />

        <label className={css.label}>
          {errors.name && (
            <span className={css.error} role="alert">
              {errors.name.message}
            </span>
          )}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Name"
                className={`${css.input} ${field?.value ? '' : css.inputEmpty}`}
                aria-invalid={Boolean(errors.name)}
              />
            )}
          />
        </label>

        <label className={css.label}>
          {errors.email && (
            <span className={css.error} role="alert">
              {errors.email.message}
            </span>
          )}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="name@gmail.com"
                className={css.input}
                aria-invalid={Boolean(errors.email)}
              />
            )}
          />
        </label>

        <label className={css.label}>
          {errors.phone && (
            <span className={css.error} role="alert">
              {errors.phone.message}
            </span>
          )}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="+380"
                className={css.input}
                aria-invalid={Boolean(errors.phone)}
              />
            )}
          />
        </label>

        <button type="submit" className={css.btnYes}>
          Save
        </button>
      </form>
    </Modal>
  );
};

export default ModalEditUser;
