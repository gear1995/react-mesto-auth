function PopupWithForm({
  isOpen,
  name,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
}) {
  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup_opened")) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form name={name} onSubmit={onSubmit} className="popup__form">
          {children}
          <button id="save" type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
