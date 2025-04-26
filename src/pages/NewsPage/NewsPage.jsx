import React, { useEffect, useState } from "react";
import SearchField from "../../components/SearchField/SearchField.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Title from "../../components/Title/Title.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../redux/news/operations.js";
import { selectNewsTotalPages } from "../../redux/news/selectors.js";
import css from "./NewsPage.module.css";
const NewsPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(selectNewsTotalPages);
  useEffect(() => {
    dispatch(
      fetchNews({
        keyword: searchQuery,
        page: currentPage,
        limit: 6,
      })
    );
  }, [dispatch, searchQuery, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.titleWrap}>
        <Title>News</Title>
        <SearchField
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <NewsList searchQuery={searchQuery} currentPage={currentPage} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default NewsPage;
