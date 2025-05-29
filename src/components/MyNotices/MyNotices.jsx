import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectViewedNotices } from "../../redux/users/selectors.js";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";
import { selectFavoritesNotices } from "../../redux/users/selectors.js";
import css from "./MyNotices.module.css";
import { fetchUserFullInfo } from "../../redux/users/operations.js";
import NoticesList from "../NoticesList/NoticesList.jsx";
const MyNotices = () => {
  const favorites = useSelector(selectFavoritesNotices);
  const viewedNotices = useSelector(selectViewedNotices);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("favorites");

  useEffect(() => {
    if (activeTab === "favorites") {
      dispatch(fetchUserFullInfo());
    } else {
      dispatch(fetchUserFullInfo());
    }
  }, [activeTab, dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className={css.tabs}>
        <button
          className={`${css.tab} ${
            activeTab === "favorites" ? css.active : ""
          }`}
          onClick={() => handleTabClick("favorites")}
        >
          My favorite pets
        </button>
        <button
          className={`${css.tab} ${activeTab === "viewed" ? css.active : ""}`}
          onClick={() => handleTabClick("viewed")}
        >
          Viewed
        </button>
      </div>

      <div className="content">
        {activeTab === "favorites" &&
          (favorites?.length > 0 ? (
            <NoticesList notices={favorites} />
          ) : (
            <p className={css.desc}>
              Oops,
              <span className={css.descPart}>
                {" "}
                looks like there aren't any furries{" "}
              </span>
              on our adorable page yet. Do not worry! View your pets on the
              "find your favorite pet" page and add them to your favorites.
            </p>
          ))}

        {activeTab === "viewed" &&
          viewedNotices?.map((notice) => (
            <NoticesItem key={notice?._id} notice={notice} />
          ))}
      </div>
    </div>
  );
};

export default MyNotices;
