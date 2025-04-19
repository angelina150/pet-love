import React from "react";

const PetsItem = ({ pet, key }) => {
  return (
    <li key={key}>
      <img src={pet?.imgURL} alt={pet?.title} />
      <h3>{pet?.title}</h3>
      <p>
        Name <span>{pet?.name}</span>
      </p>
      <p>
        Birthday <span>{pet?.birthday}</span>
      </p>
      <p>
        Sex <span>{pet?.sex}</span>
      </p>
      <p>
        Species <span>{pet?.species}</span>
      </p>
      <button>
        <svg width="18" height="18">
          <use href="/images/icons.svg#icon-trash"></use>
        </svg>
      </button>
    </li>
  );
};

export default PetsItem;
