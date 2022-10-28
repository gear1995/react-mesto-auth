import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleCardName = (e) => {
    setName(e.target.value);
  };

  const handleCardLink = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link: link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name={"adding"}
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onOverlayClose={props.onOverlayClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        required
        placeholder="Название"
        className="popup__input popup__input_place_field-image-name"
        id="title"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleCardName}
      />
      <span id="error-title" className="error-massage"></span>
      <input
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_place_field-link"
        id="link"
        required
        value={link}
        onChange={handleCardLink}
      />
      <span id="error-link" className="error-massage"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
