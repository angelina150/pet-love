import React from "react";
import css from "./PetBlock.module.css";
const PetBlock = ({ imageUrl, altText, children }) => {
  return (
    <div className="pet-block">
      <img src={imageUrl} alt={altText} className={css.img} />
      <div className="pet-content">{children}</div>
    </div>
  );
};

export default PetBlock;
