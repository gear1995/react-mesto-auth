import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `delete-button ${
    isOwn ? "" : "delete-button_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `like-button ${
    isLiked ? "like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="elements__item">
      <li className="element">
        <button
          type="button"
          onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}
        ></button>
        <img
          onClick={handleClick}
          src={card.link}
          alt={card.name}
          className="element__image"
        />
        <div className="element__container">
          <h2 className="element__title">{card.name}</h2>
          <div className="like-container">
            <button
              type="button"
              onClick={handleLikeClick}
              className={cardLikeButtonClassName}
            ></button>
            <div className="like-container__counter">{card.likes.length}</div>
          </div>
        </div>
      </li>
    </article>
  );
}
export default Card;
