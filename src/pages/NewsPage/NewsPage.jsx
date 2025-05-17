import React, { useEffect, useState } from "react";
import SearchField from "../../components/SearchField/SearchField.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Title from "../../components/Title/Title.jsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  selectNews,
  selectNewsPage,
  selectNewsTotalPages,
} from "../../redux/news/selectors.js";
import css from "./NewsPage.module.css";
import { fetchNews } from "../../redux/news/operations.js";

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews, shallowEqual);
  const totalPages = useSelector(selectNewsTotalPages);
  const [searchQuery, setSearchQuery] = useState("");
  const currentPage = useSelector(selectNewsPage);
  const limit = 6;
  useEffect(() => {
    const loadNews = async () => {
      await dispatch(fetchNews({ keyword: "", page: 1, limit }));
    };
    loadNews();
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    dispatch(fetchNews({ keyword: query, page: 1, limit }));
  };
  return (
    <div className={css.wrapper}>
      <div className={css.titleWrap}>
        <Title>News</Title>
        <SearchField
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          pageType="news"
        />
      </div>

      {news.length > 0 ? <NewsList news={news} /> : <div>Not found</div>}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={(page) => {
            dispatch(fetchNews({ keyword: searchQuery, page, limit }));
          }}
        />
      )}
    </div>
  );
};

export default NewsPage;
