import React from "react";
import css from "./PetBlock.module.css";

const PetBlock = ({ sources, defaultImage, altText, children }) => {
  return (
    <div className={css.petBlock}>
      <picture className={css.picture}>
        {sources?.map(({ media, srcSet }, idx) => (
          <source key={idx} media={media} srcSet={srcSet} />
        ))}
        <img src={defaultImage} alt={altText} className={css.img} />
      </picture>
      <div className={css.petContent}>{children}</div>
    </div>
  );
};
export default PetBlock;
