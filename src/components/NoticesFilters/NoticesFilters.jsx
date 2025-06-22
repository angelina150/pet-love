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
    minHeight: window.innerWidth < 768 ? '42px' : '48px',
    height: '100%',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#262626',
    padding: ' 10px 6px',
    textAlign: 'start',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
    lineHeight: window.innerWidth < 768 ? '18px' : '20px',
    letterSpacing: '-0.03em',
  }),
  singleValue: provided => ({
    ...provided,
    color: '#262626',
    textAlign: 'start',
    padding: '10px 40px 10px 6px',
    whiteSpace: 'nowrap',
    overflow: ' hidden',
    textOverflow: 'ellipsis',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
    lineHeight: window.innerWidth < 768 ? '18px' : '20px',
    letterSpacing: '-0.03em',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '15px',
    overflow: 'hidden',
    textAlign: 'start',
    color: '#26262666',
    maxHeight: '200px',
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
  clearIndicator: provided => ({
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
            type="text"
            placeholder="Category"
            value={category}
            readOnly
            aria-haspopup="listbox"
            aria-expanded={openDropdown === 'category'}
            aria-controls="category-listbox"
            onClick={() =>
              setOpenDropdown(openDropdown === 'category' ? null : 'category')
            }
            className={`${css.input} ${css.inputCategory}`}
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
            <ul
              id="category-listbox"
              role="listbox"
              className={css.dropdownMenu}
              tabIndex={-1}
            >
              <li
                role="option"
                aria-selected={category === ''}
                tabIndex={0}
                className={css.dropdownItemShowAll}
                onClick={() => {
                  handleDropdownSelect('category', '');
                  setOpenDropdown(null);
                }}
              >
                Show all
              </li>
              {categories.map(cat => (
                <li
                  key={cat}
                  role="option"
                  aria-selected={category === cat}
                  tabIndex={0}
                  className={css.dropdownItem}
                  onClick={() => {
                    handleDropdownSelect('category', cat);
                    setOpenDropdown(null);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.sexWrapper} ref={sexRef}>
          <input
            type="text"
            placeholder="By gender"
            value={sex}
            readOnly
            aria-haspopup="listbox"
            aria-expanded={openDropdown === 'sex'}
            aria-controls="sex-listbox"
            onClick={() =>
              setOpenDropdown(openDropdown === 'sex' ? null : 'sex')
            }
            className={`${css.input} ${css.inputGender}`}
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
            <ul
              id="sex-listbox"
              role="listbox"
              className={css.dropdownMenu}
              tabIndex={-1}
            >
              <li
                role="option"
                aria-selected={sex === ''}
                tabIndex={0}
                className={css.dropdownItemShowAll}
                onClick={() => {
                  handleDropdownSelect('sex', '');
                  setOpenDropdown(null);
                }}
              >
                Show all
              </li>
              {sexOptions.map(option => (
                <li
                  key={option}
                  role="option"
                  aria-selected={sex === option}
                  tabIndex={0}
                  className={css.dropdownItem}
                  onClick={() => {
                    handleDropdownSelect('sex', option);
                    setOpenDropdown(null);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.speciesWrapper} ref={speciesRef}>
          <input
            type="text"
            placeholder="By type"
            value={species}
            readOnly
            aria-haspopup="listbox"
            aria-expanded={openDropdown === 'species'}
            aria-controls="species-listbox"
            onClick={() =>
              setOpenDropdown(openDropdown === 'species' ? null : 'species')
            }
            className={`${css.input} ${css.inputSpecies}`}
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
            <ul
              id="species-listbox"
              role="listbox"
              className={css.dropdownMenu}
              tabIndex={-1}
            >
              <li
                role="option"
                aria-selected={species === ''}
                tabIndex={0}
                className={css.dropdownItemShowAll}
                onClick={() => {
                  handleDropdownSelect('species', '');
                  setOpenDropdown(null);
                }}
              >
                Show all
              </li>
              {speciesOptions.map(option => (
                <li
                  key={option}
                  role="option"
                  aria-selected={species === option}
                  tabIndex={0}
                  className={css.dropdownItem}
                  onClick={() => {
                    handleDropdownSelect('species', option);
                    setOpenDropdown(null);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.selectInput}>
          <Select
            classNames={{
              placeholder: () => 'custom-select__placeholder',
            }}
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
            aria-label="Select location"
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
          {locationId && (
            <button
              className={css.btnClear}
              type="button"
              onClick={() => handleFilterChange('locationId', '')}
              title="Clear location filter"
            >
              <svg className={css.iconClear} width="18" height="18">
                <use href="/images/icons.svg#icon-close"></use>
              </svg>
            </button>
          )}
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
                  aria-label={`Clear sort ${option}`}
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
            aria-label="Reset all filters"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default NoticesFilters;
