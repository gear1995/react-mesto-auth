import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useContext } from "react";

function Main({
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__item">
          <img
            // style={{ backgroundImage: `url(${currentUser.avatar})` }}
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__image"
          />
          <button onClick={onEditAvatar} className="avatar-edit" />
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button"
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
