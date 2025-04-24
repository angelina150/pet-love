import React from "react";
import css from "./OurFriendsItem.module.css";
const OurFriendsItem = ({ friend }) => {
  return (
    <li className={css.list}>
      <img className={css.img} src={friend.imageUrl} alt={friend.title} />

      {friend?.workDays ? (
        <ul>
          {friend.workDays.map((day, index) => (
            <li key={day._id || index}>
              {day.isOpen ? `${day.from} – ${day.to}` : "Closed"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No time</p>
      )}

      <h2>{friend.title}</h2>
      <p>Email: {friend.email}</p>
      <p>Address: {friend.address}</p>
      <p>Phone: {friend.phone}</p>
    </li>
  );
};

export default OurFriendsItem;
