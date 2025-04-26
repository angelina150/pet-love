import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title.jsx";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters.jsx";
import NoticesList from "../../components/NoticesList/NoticesList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../../redux/notices/operations.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { selectTotalPages } from "../../redux/notices/selectors.js";
import css from "./NoticesPage.module.css";

const NoticesPage = () => {
  const totalPages = useSelector(selectTotalPages);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [species, setSpecies] = useState("");
  const [locationId, setLocationId] = useState("");
  const [byDate, setByDate] = useState(true);
  const [byPrice, setByPrice] = useState(false);
  const [byPopularity, setByPopularity] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [sex, setSex] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchNotices({
        keyword,
        category,
        species,
        locationId,
        byDate,
        byPrice,
        byPopularity,
        page,
        limit,
        sex,
      })
    );
  }, [
    dispatch,
    keyword,
    category,
    species,
    locationId,
    byDate,
    byPrice,
    byPopularity,
    page,
    limit,
    sex,
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
      case "page":
        setPage(value);
        break;
      default:
        break;
    }
  };
  return (
    <div className={css.wrapper}>
      <Title>Find your favorite pet</Title>

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

      <NoticesList
        keyword={keyword}
        category={category}
        species={species}
        locationId={locationId}
        byDate={byDate}
        byPrice={byPrice}
        byPopularity={byPopularity}
        page={page}
        limit={limit}
        sex={sex}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default NoticesPage;
