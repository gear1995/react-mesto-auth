import React, { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onOverlayClose={props.onOverlayClose}
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
