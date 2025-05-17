import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserNotices } from "../../redux/users/selectors.js";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";

const MyNotices = () => {
  const notices = useSelector(selectUserNotices);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("favorites");

  const favorites = useSelector((state) => state.notices.favorites);
  const viewed = useSelector((state) => state.notices.viewed);

  // useEffect(() => {
  //   if (activeTab === "favorites") {
  //     dispatch(fetchFavorites());
  //   } else {
  //     dispatch(fetchViewed());
  //   }
  // }, [activeTab, dispatch]);

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

  // const handleRemoveFromFavorites = (noticeId) => {
  //   dispatch(removeFromFavorites(noticeId));
  // };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === "favorites" ? "active" : ""}
          // onClick={() => handleTabClick("favorites")}
        >
          My favorites pets
        </button>
        <button
          className={activeTab === "viewed" ? "active" : ""}
          // onClick={() => handleTabClick("viewed")}
        >
          Viewed
        </button>
      </div>

      <div className="content">
        {activeTab === "favorites" &&
          favorites?.map((notice) => (
            <NoticesItem key={notice._id} notice={notice}>
              <button
                className="remove-btn"
                // onClick={() => handleRemoveFromFavorites(notice._id)}
              >
                🗑️
              </button>
            </NoticesItem>
          ))}

        {activeTab === "viewed" &&
          viewed?.map((notice) => (
            <NoticesItem key={notice._id} notice={notice} />
          ))}
      </div>
    </div>
  );
};

export default MyNotices;
