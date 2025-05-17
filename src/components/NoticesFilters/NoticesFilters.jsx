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
  const categories = useSelector(selectCategories);
  const sexOptions = useSelector(selectNoticesSex);
  const speciesOptions = useSelector(selectNoticesSpecies);
  const locations = useSelector(selectLocations);
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchNoticesCategories());
    }
    if (!sexOptions || sexOptions.length === 0) {
      dispatch(fetchNoticesSex());
    }
    if (!speciesOptions || speciesOptions.length === 0) {
      dispatch(fetchNoticesSpecies());
    }
    if (!locations || locations.length === 0) {
      dispatch(fetchCitiesLocations());
    }
  }, [dispatch, categories, sexOptions, speciesOptions, locations]);

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

  // const handleReset = () => {
  //   resetFilters();
  //   setFilters({
  //     keyword: "",
  //     category: "",
  //     species: "",
  //     locationId: "",
  //     sex: "",
  //     sortBy: "date",
  //   });
  // };
  return (
    <div className={css.wrapper}>
      <div className={css.inputsWrapper}>
        <SearchField
          pageType="notices"
          searchQuery={filters.keyword}
          onSearch={(query) => handleSelectChange("keyword", { value: query })}
          setSearchQuery={(query) =>
            setFilters((prev) => ({ ...prev, keyword: query }))
          }
        />

        <input
          className={css.input}
          list="category-options"
          value={filters.category || ""}
          onChange={(e) =>
            handleSelectChange("category", { value: e.target.value })
          }
          placeholder="Select Category"
        />

        <datalist id="category-options">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>

        <input
          className={css.input}
          list="sex-options"
          value={filters.sex || ""}
          onChange={(e) => handleSelectChange("sex", { value: e.target.value })}
          placeholder="Select Sex"
        />

        <datalist id="sex-options">
          {sexOptions.map((sex) => (
            <option key={sex} value={sex} />
          ))}
        </datalist>

        <input
          className={css.input}
          list="species-options"
          value={filters.species || ""}
          onChange={(e) =>
            handleSelectChange("species", { value: e.target.value })
          }
          placeholder="Select Species"
        />

        <datalist id="species-options">
          {speciesOptions.map((species) => (
            <option key={species} value={species} />
          ))}
        </datalist>

        <Select
          className={css.selectInput}
          value={
            locations.find((loc) => loc.id === filters.locationId)
              ? {
                  value: filters.locationId,
                  label: `${
                    locations.find((loc) => loc.id === filters.locationId)?.city
                  }, ${
                    locations.find((loc) => loc.id === filters.locationId)
                      ?.state
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
      </div>

      <div className={css.sortOptions}>
        <label className={css.radioLabel}>
          <input
            className={css.radioInput}
            type="radio"
            name="sortBy"
            value="popularity"
            checked={filters.sortBy === "popularity"}
            onChange={handleSortChange}
          />
          Popular
        </label>
        <label className={css.radioLabel}>
          <input
            className={css.radioInput}
            type="radio"
            name="sortBy"
            value="popularity"
            checked={filters.sortBy === "popularity"}
            onChange={handleSortChange}
          />
          Unpopular
        </label>
        <label className={css.radioLabel}>
          <input
            className={css.radioInput}
            type="radio"
            name="sortBy"
            value="price"
            checked={filters.sortBy === "price"}
            onChange={handleSortChange}
          />
          Cheap
        </label>
        <label className={css.radioLabel}>
          <input
            className={css.radioInput}
            type="radio"
            name="sortBy"
            value="price"
            checked={filters.sortBy === "price"}
            onChange={handleSortChange}
          />
          Expensive
        </label>
      </div>
    </div>
  );
};

export default NoticesFilters;
