import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCategories,
  selectNoticesSex,
  selectNoticesSpecies,
} from '../../redux/notices/selectors.js';
import { selectLocations } from '../../redux/cities/selectors.js';
import SearchField from '../SearchField/SearchField.jsx';
import {
  fetchNoticesCategories,
  fetchNoticesSex,
  fetchNoticesSpecies,
} from '../../redux/notices/operations.js';
import { fetchCitiesLocations } from '../../redux/cities/operations.js';
import css from './NoticesFilters.module.css';
import { toast } from 'react-toastify';
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#fff',
    borderRadius: '30px',
    borderColor: state.isFocused ? '#F6B83D' : '#fff',
    boxShadow: null,
    '&:hover': {
      borderColor: '#F6B83D',
    },
    height: '100%',
    padding: '0',
    textAlign: 'start',
  }),
  // placeholder: provided => ({
  //   ...provided,
  //   color: '#262626',
  //   padding: '12px',
  // }),
  singleValue: provided => ({
    ...provided,
    color: '#262626',
    padding: '12px',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '15px',
    overflow: 'hidden',
    textAlign: 'start',
    color: '#26262666',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'white' : '#fff',
    color: state.isFocused ? '#262626' : '#26262666',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    cursor: 'pointer',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    display: 'none',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
};
const NoticesFilters = ({
  keyword,
  category,
  species,
  locationId,
  sex,
  byPrice,
  byPopularity,
  handleFilterChange,
  resetFilters,
  handleSortChange,
}) => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const sexOptions = useSelector(selectNoticesSex);
  const speciesOptions = useSelector(selectNoticesSpecies);
  const locations = useSelector(selectLocations);
  const categoryRef = useRef();
  const sexRef = useRef();
  const speciesRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (!categories.length) dispatch(fetchNoticesCategories());
    if (!sexOptions.length) dispatch(fetchNoticesSex());
    if (!speciesOptions.length) dispatch(fetchNoticesSpecies());
    if (!locations.length) dispatch(fetchCitiesLocations());
  }, [dispatch, categories, sexOptions, speciesOptions, locations]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openDropdown === 'category' &&
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
      if (
        openDropdown === 'sex' &&
        sexRef.current &&
        !sexRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
      if (
        openDropdown === 'species' &&
        speciesRef.current &&
        !speciesRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handleSelectChange = (name, value) => {
    const val = value && value.value !== undefined ? value.value : value || '';
    handleFilterChange(name, val);
  };

  const handleDropdownSelect = (name, value) => {
    handleFilterChange(name, value);
    setOpenDropdown(null);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.inputsWrapper}>
        <SearchField
          pageType="notices"
          searchQuery={keyword}
          onSearch={query => handleSelectChange('keyword', query)}
          setSearchQuery={query => handleFilterChange('keyword', query)}
        />

        <div className={css.categoryWrapper} ref={categoryRef}>
          <input
            readOnly
            className={`${css.input} ${css.inputCategory}`}
            type="text"
            placeholder="Category"
            value={category}
            onClick={() =>
              setOpenDropdown(openDropdown === 'category' ? null : 'category')
            }
            autoComplete="off"
          />
          <svg
            className={`${css.iconDropdown} ${
              openDropdown === 'category' ? css.iconDropdownOpen : ''
            }`}
            onClick={() =>
              setOpenDropdown(openDropdown === 'category' ? null : 'category')
            }
          >
            <use href="/images/icons.svg#icon-chevron-down" />
          </svg>
          {openDropdown === 'category' && (
            <ul className={css.dropdownMenu}>
              <li
                key="show-all"
                className={css.dropdownItemShowAll}
                onClick={() => handleDropdownSelect('category', '')}
              >
                Show all
              </li>
              {categories.map(cat => (
                <li
                  key={cat}
                  className={css.dropdownItem}
                  onClick={() => handleDropdownSelect('category', cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.sexWrapper} ref={sexRef}>
          <input
            readOnly
            className={`${css.input} ${css.inputGender}`}
            type="text"
            placeholder="By gender"
            value={sex}
            onClick={() =>
              setOpenDropdown(openDropdown === 'sex' ? null : 'sex')
            }
            autoComplete="off"
          />
          <svg
            className={`${css.iconDropdown} ${
              openDropdown === 'sex' ? css.iconDropdownOpen : ''
            }`}
            onClick={() =>
              setOpenDropdown(openDropdown === 'sex' ? null : 'sex')
            }
          >
            <use href="/images/icons.svg#icon-chevron-down" />
          </svg>
          {openDropdown === 'sex' && (
            <ul className={css.dropdownMenu}>
              <li
                key="show-all"
                className={css.dropdownItemShowAll}
                onClick={() => handleDropdownSelect('sex', '')}
              >
                Show all
              </li>
              {sexOptions.map(option => (
                <li
                  key={option}
                  className={css.dropdownItem}
                  onClick={() => handleDropdownSelect('sex', option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.speciesWrapper} ref={speciesRef}>
          <input
            readOnly
            className={`${css.input} ${css.inputSpecies}`}
            type="text"
            placeholder="By type"
            value={species}
            onClick={() =>
              setOpenDropdown(openDropdown === 'species' ? null : 'species')
            }
            autoComplete="off"
          />
          <svg
            className={`${css.iconDropdown} ${
              openDropdown === 'species' ? css.iconDropdownOpen : ''
            }`}
            onClick={() =>
              setOpenDropdown(openDropdown === 'species' ? null : 'species')
            }
          >
            <use href="/images/icons.svg#icon-chevron-down" />
          </svg>
          {openDropdown === 'species' && (
            <ul className={css.dropdownMenu}>
              <li
                key="show-all"
                className={css.dropdownItemShowAll}
                onClick={() => handleDropdownSelect('species', '')}
              >
                Show all
              </li>
              {speciesOptions.map(option => (
                <li
                  key={option}
                  className={css.dropdownItem}
                  onClick={() => handleDropdownSelect('species', option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={css.selectInput}>
          <Select
            classNamePrefix="custom-select"
            styles={customStyles}
            value={
              locationId
                ? locations
                    .filter(loc => loc._id === locationId)
                    .map(loc => ({
                      value: loc._id,
                      label: `${loc.stateEn}, ${loc.cityEn}`,
                    }))[0]
                : null
            }
            onChange={option => handleSelectChange('locationId', option)}
            options={locations.map(loc => ({
              value: loc._id,
              label: `${loc.stateEn}, ${loc.cityEn}`,
            }))}
            placeholder="Location"
            isClearable
          />
          <svg
            className={css.iconSearch}
            onClick={() => {
              if (locationId) {
                const selected = locations.find(loc => loc._id === locationId);
                handleSelectChange('locationId', {
                  value: selected._id,
                  label: `${selected.stateEn}, ${selected.cityEn}`,
                });
              } else {
                toast.info('Please select a location');
              }
            }}
          >
            <use href="/images/icons.svg#icon-search"></use>
          </svg>
        </div>
      </div>

      <div className={css.sortOptions}>
        {['popularity', 'unpopularity', 'cheap', 'expensive'].map(option => {
          const isActive =
            (option === 'popularity' && byPopularity === false) ||
            (option === 'unpopularity' && byPopularity === true) ||
            (option === 'cheap' && byPrice === true) ||
            (option === 'expensive' && byPrice === false);

          return (
            <label
              className={`${css.radioLabel} ${isActive ? css.active : ''}`}
              key={option}
            >
              <input
                className={css.radioInput}
                type="radio"
                name="sortBy"
                value={option || ''}
                checked={isActive}
                onChange={e => handleSortChange(e)}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
              {isActive && (
                <svg
                  className={css.iconClose}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSortChange({ target: { value: '' } });
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <use href="/images/icons.svg#icon-close" />
                </svg>
              )}
            </label>
          );
        })}

        {(keyword ||
          category ||
          species ||
          locationId ||
          sex ||
          byPrice ||
          byPopularity) && (
          <button
            className={`${css.btnReset} ${css.radioLabel}`}
            type="button"
            onClick={resetFilters}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticesFilters;
