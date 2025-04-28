import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCategories,
  selectNoticesSex,
  selectNoticesSpecies,
} from "../../redux/notices/selectors.js";
import { selectLocations } from "../../redux/cities/selectors.js";
import SearchField from "../SearchField/SearchField.jsx";
import {
  fetchNoticesCategories,
  fetchNoticesSex,
  fetchNoticesSpecies,
} from "../../redux/notices/operations.js";
import { fetchCitiesLocations } from "../../redux/cities/operations.js";
import css from "./NoticesFilters.module.css";

const NoticesFilters = ({
  keyword,
  category,
  species,
  locationId,
  byDate,
  byPrice,
  byPopularity,
  sex,
  handleFilterChange,
  resetFilters,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNoticesCategories());
    dispatch(fetchNoticesSex());
    dispatch(fetchNoticesSpecies());
    dispatch(fetchCitiesLocations());
  }, [dispatch]);
  const categories = useSelector(selectCategories);
  const sexOptions = useSelector(selectNoticesSex);
  const speciesOptions = useSelector(selectNoticesSpecies);
  const locations = useSelector(selectLocations);

  const [filters, setFilters] = useState({
    keyword,
    category,
    species,
    locationId,
    sex,
    sortBy: "date",
  });

  const handleSelectChange = (name, selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setFilters((prev) => ({ ...prev, [name]: value }));
    handleFilterChange(name, value);
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
    handleFilterChange("sortBy", e.target.value);
  };

  const handleReset = () => {
    resetFilters();
    setFilters({
      keyword: "",
      category: "",
      species: "",
      locationId: "",
      sex: "",
      sortBy: "date",
    });
  };
  console.log(sexOptions);
  return (
    <div className={css.wrapper}>
      <SearchField
        searchQuery={filters.keyword}
        onSearch={(query) => handleSelectChange("keyword", { value: query })}
        setSearchQuery={(query) =>
          setFilters((prev) => ({ ...prev, keyword: query }))
        }
      />

      <Select
        value={
          filters.category
            ? { value: filters.category, label: filters.category }
            : null
        }
        onChange={(option) => handleSelectChange("category", option)}
        options={categories.map((cat) => ({ value: cat, label: cat }))}
        placeholder="Select Category"
        isClearable
      />

      <Select
        value={filters.sex ? { value: filters.sex, label: filters.sex } : null}
        onChange={(option) => handleSelectChange("sex", option)}
        options={sexOptions.map((sex) => ({ value: sex, label: sex }))}
        placeholder="Select Sex"
        isClearable
      />

      <Select
        value={
          filters.species
            ? { value: filters.species, label: filters.species }
            : null
        }
        onChange={(option) => handleSelectChange("species", option)}
        options={speciesOptions.map((species) => ({
          value: species,
          label: species,
        }))}
        placeholder="Select Species"
        isClearable
      />

      <Select
        value={
          locations.find((loc) => loc.id === filters.locationId)
            ? {
                value: filters.locationId,
                label: `${
                  locations.find((loc) => loc.id === filters.locationId)?.city
                }, ${
                  locations.find((loc) => loc.id === filters.locationId)?.state
                }`,
              }
            : null
        }
        onChange={(option) => handleSelectChange("locationId", option)}
        options={locations.map((loc) => ({
          value: loc.id,
          label: `${loc.city}, ${loc.state}`,
        }))}
        placeholder="Select Location"
        isClearable
      />

      <div className={css.sortOptions}>
        <label>
          <input
            type="radio"
            name="sortBy"
            value="popularity"
            checked={filters.sortBy === "popularity"}
            onChange={handleSortChange}
          />
          Popular
        </label>

        <label>
          <input
            type="radio"
            name="sortBy"
            value="price"
            checked={filters.sortBy === "price"}
            onChange={handleSortChange}
          />
          Cheap
        </label>
      </div>

      <button type="button" onClick={handleReset} className={css.resetButton}>
        Reset
      </button>
    </div>
  );
};

export default NoticesFilters;
