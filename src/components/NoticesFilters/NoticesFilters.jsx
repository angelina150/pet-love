import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { selectCategories } from "../../redux/notices/selectors.js";
import { selectLocations } from "../../redux/cities/selectors.js";
import SearchField from "../SearchField/SearchField.jsx";
import { fetchNoticesCategories } from "../../redux/notices/operations.js";
import { fetchCitiesLocations } from "../../redux/cities/operations.js";

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
  const locations = useSelector(selectLocations);
  console.log(locations);
  const [filters, setFilters] = useState({
    keyword,
    category,
    species,
    locationId,
    sex,
    sortBy: "date",
  });

  useEffect(() => {
    dispatch(fetchNoticesCategories());
    dispatch(fetchCitiesLocations());
  }, [dispatch]);

  const handleSearchChange = (query) => {
    setFilters((prevState) => ({
      ...prevState,
      keyword: query,
    }));
    handleFilterChange("keyword", query);
  };

  const handleCategoryChange = (selectedCategory) => {
    setFilters((prevState) => ({
      ...prevState,
      category: selectedCategory ? selectedCategory.value : "",
    }));
    handleFilterChange("category", selectedCategory.value);
  };

  const handleSexChange = (selectedSex) => {
    setFilters((prevState) => ({
      ...prevState,
      sex: selectedSex ? selectedSex.value : "",
    }));
    handleFilterChange("sex", selectedSex.value);
  };

  const handleLocationChange = (selectedLocation) => {
    setFilters((prevState) => ({
      ...prevState,
      locationId: selectedLocation ? selectedLocation.value : "",
    }));
    handleFilterChange(
      "locationId",
      selectedLocation ? selectedLocation.value : ""
    );
  };

  const handleSortChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      sortBy: e.target.value,
    }));
    handleFilterChange("sortBy", e.target.value);
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      category: "",
      species: "",
      locationId: "",
      sex: "",
      sortBy: "date",
    });
    resetFilters();
  };

  return (
    <div>
      <SearchField
        searchQuery={filters.keyword}
        onSearch={handleSearchChange}
        setSearchQuery={(query) =>
          setFilters((prevState) => ({ ...prevState, keyword: query }))
        }
      />

      <Select
        value={categories.find((cat) => cat === filters.category)}
        onChange={handleCategoryChange}
        options={categories.map((category) => ({
          value: category,
          label: category,
        }))}
        placeholder="Select Category"
      />

      <Select
        value={{ value: filters.sex, label: filters.sex }}
        onChange={handleSexChange}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        placeholder="Select Sex"
      />

      <Select
        value={locations.find((loc) => loc.id === filters.locationId)}
        onChange={handleLocationChange}
        options={locations.map((loc) => ({
          value: loc.id,
          label: `${loc.city}, ${loc.state}`,
        }))}
        placeholder="Select Location"
        isClearable
      />

      <div>
        <label>
          <input
            type="radio"
            name="sortBy"
            value="date"
            checked={filters.sortBy === "date"}
            onChange={handleSortChange}
          />
          Sort by Date
        </label>
        <label>
          <input
            type="radio"
            name="sortBy"
            value="price"
            checked={filters.sortBy === "price"}
            onChange={handleSortChange}
          />
          Sort by Price
        </label>
        <label>
          <input
            type="radio"
            name="sortBy"
            value="popularity"
            checked={filters.sortBy === "popularity"}
            onChange={handleSortChange}
          />
          Sort by Popularity
        </label>
      </div>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default NoticesFilters;
