import React, { useEffect, useState } from "react";
import SearchField from "../../components/SearchField/SearchField.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Title from "../../components/Title/Title.jsx";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../redux/news/operations.js";

const NewsPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(
      fetchNews({
        keyword: searchQuery,
        page: currentPage,
        limit: 10,
      })
    );
  }, [dispatch, searchQuery, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div>
      <Title>News</Title>
      <SearchField
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <NewsList searchQuery={searchQuery} currentPage={currentPage} />
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default NewsPage;
