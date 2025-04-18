import React from "react";
import css from "./OurFriendsItem.module.css";
const OurFriendsItem = ({ friend, key }) => {
  return (
    <div className={css.list}>
      <li key={key}>
        <img className={css.img} src={friend.imageUrl} alt={friend.title} />
        <ul>
          {friend.workDays?.map((day, index) => (
            <li key={day._id || index}>
              {day.isOpen ? `${day.from} – ${day.to}` : "Closed"}
            </li>
          ))}
        </ul>
        <h2> {friend.title}</h2>
        <p>Email: {friend.email}</p>
        <p>Address: {friend.address}</p>
        <p>Phone: {friend.phone}</p>
      </li>
    </div>
  );
};

export default OurFriendsItem;
