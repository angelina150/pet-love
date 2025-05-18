import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title.jsx";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters.jsx";
import NoticesList from "../../components/NoticesList/NoticesList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../../redux/notices/operations.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
  selectNotices,
  selectNoticesPage,
  selectTotalPages,
} from "../../redux/notices/selectors.js";
import css from "./NoticesPage.module.css";
import { selectFavoritesNotices } from "../../redux/users/selectors.js";

const NoticesPage = () => {
  const notices = useSelector(selectNotices);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectNoticesPage);
  const favoritesNotices = useSelector(selectFavoritesNotices);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [species, setSpecies] = useState("");
  const [locationId, setLocationId] = useState("");
  const [byDate, setByDate] = useState(null);
  const [byPrice, setByPrice] = useState(null);
  const [byPopularity, setByPopularity] = useState(null);
  const [sex, setSex] = useState("");

  const limit = 6;

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = {};

    if (keyword) filters.keyword = keyword;
    if (category) filters.category = category;
    if (species) filters.species = species;
    if (locationId) filters.locationId = locationId;
    if (sex) filters.sex = sex;
    if (byDate !== undefined) filters.byDate = byDate;
    if (byPrice !== undefined) filters.byPrice = byPrice;
    if (byPopularity !== undefined) filters.byPopularity = byPopularity;

    filters.page = currentPage;
    filters.limit = limit;

    dispatch(fetchNotices(filters));
  }, [
    dispatch,
    keyword,
    category,
    species,
    locationId,
    byDate,
    byPrice,
    byPopularity,
    currentPage,
    sex,
    limit,
  ]);

  const handleFilterChange = (name, value) => {
    switch (name) {
      case "keyword":
        setKeyword(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "species":
        setSpecies(value);
        break;
      case "locationId":
        setLocationId(value);
        break;
      case "byDate":
        setByDate(value);
        break;
      case "byPrice":
        setByPrice(value);
        break;
      case "byPopularity":
        setByPopularity(value);
        break;
      case "sex":
        setSex(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={css.wrapper}>
        <Title>Find your favorite pet</Title>
      </div>
      <NoticesFilters
        keyword={keyword}
        category={category}
        species={species}
        locationId={locationId}
        byDate={byDate}
        byPrice={byPrice}
        byPopularity={byPopularity}
        sex={sex}
        handleFilterChange={handleFilterChange}
      />
      <div className={css.wrapper}>
        {notices.length > 0 ? (
          <NoticesList notices={notices} favoritesNotices={favoritesNotices} />
        ) : (
          <div>Not found</div>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={(page) => {
            dispatch(
              fetchNotices({
                keyword,
                category,
                species,
                locationId,
                sex,
                byDate,
                byPrice,
                byPopularity,
                page,
                limit,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default NoticesPage;
