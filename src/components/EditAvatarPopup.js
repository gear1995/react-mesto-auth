import React, { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onOverlayClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
      <input
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_place_field-link"
        id="avatar-link"
        required
        ref={avatarRef}
      />
      <span id="error-avatar-link" className="error-massage"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
