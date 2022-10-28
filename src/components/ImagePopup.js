function ImagePopup({ card, onClose }) {
  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup_opened")) {
      onClose();
    }
  }
  return (
    <div
      className={`popup popup_type_image  ${card.link ? "popup_opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container popup__container-image">
        <button
          type="button"
          onClick={onClose}
          className="popup__close"
        ></button>
        <img src={card.link} alt={card.name} className="popup__element-image" />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
