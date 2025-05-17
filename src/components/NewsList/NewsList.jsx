import React from "react";
import { useSelector } from "react-redux";
import NewsItem from "../NewsItem/NewsItem.jsx";
import Loader from "../Loader/Loader.jsx";
import { selectNewsLoading } from "../../redux/news/selectors.js";
import css from "./NewsList.module.css";
const NewsList = ({ news }) => {
  const loading = useSelector(selectNewsLoading);

  if (loading) return <Loader />;

  return (
    <ul className={css.list}>
      {news?.map((item) => (
        <NewsItem key={item._id} newsItem={item} />
      ))}
    </ul>
  );
};

export default NewsList;
