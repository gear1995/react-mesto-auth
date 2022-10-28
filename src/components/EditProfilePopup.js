import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name={"profile"}
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        name="name"
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_place_field-name"
        id="name"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span id="error-name" className="error-massage"></span>

      <input
        required
        minLength="2"
        maxLength="200"
        name="description"
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_place_field-description"
        id="description"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span id="error-description" className="error-massage"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
