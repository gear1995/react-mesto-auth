function ImagePopup({ card, onClose, onOverlayClose }) {
  return (
    <div
      className={`popup popup_type_image  ${card.link ? "popup_opened" : ""}`}
      onClick={onOverlayClose}
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
