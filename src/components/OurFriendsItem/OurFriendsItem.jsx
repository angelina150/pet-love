import React from "react";
import css from "./OurFriendsItem.module.css";

const OurFriendsItem = ({ friend }) => {
  const formatAddress = (address) => {
    if (!address) return "";
    const parts = address.split(",");
    if (parts.length === 1) return address.trim();
    const [firstPart, ...restParts] = parts;
    const streetParts = firstPart.trim().split(" ");
    const houseNumberIndex = streetParts.findIndex((part) => /\d/.test(part));
    if (houseNumberIndex !== -1) {
      return `${streetParts.slice(houseNumberIndex + 1).join(" ")}, ${
        streetParts[houseNumberIndex]
      }`;
    }
    return restParts
      .slice(0, -1)
      .map((part) => part.trim())
      .join(", ");
  };

  const openDays = friend?.workDays?.filter((day) => day.isOpen) || [];

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    friend.address
  )}`;
  return (
    <li className={css.list}>
      <img
        className={css.img}
        src={friend.imageUrl}
        alt={friend.title}
        loading="lazy"
      />
      {openDays.length > 0 ? (
        openDays.map((day, index) => (
          <p className={css.worksDay} key={day._id || index}>
            {`${day.from} - ${day.to}`}
          </p>
        ))
      ) : (
        <p className={css.worksDay}>Day and night</p>
      )}
      <div>
        <h2 className={css.title}>{friend.title}</h2>
        <p className={css.name}>
          Email:{' '}
          {friend.email ? (
            <a
              className={`${css.info} ${css.link}`}
              href={`mailto:${friend.email}`}
            >
              {friend.email}
            </a>
          ) : (
            <span className={css.info}>phone or address only</span>
          )}
        </p>
        <p className={css.name}>
          Address:{' '}
          {friend.address ? (
            <a
              className={`${css.info} ${css.link}`}
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatAddress(friend.address)}
            </a>
          ) : (
            <span className={css.info}>website only</span>
          )}
        </p>
        <p className={css.name}>
          Phone:{' '}
          {friend.phone ? (
            <a
              className={`${css.info} ${css.link}`}
              href={`tel:${friend.phone}`}
            >
              {friend.phone}
            </a>
          ) : (
            <span className={css.info}>email only</span>
          )}
        </p>
      </div>
    </li>
  );
};

export default OurFriendsItem;
