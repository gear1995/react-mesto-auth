function InfoTooltip({ onClose, onOverlayClose, title, image, isOpen }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={onOverlayClose}
    >
      <div className="popup__info-tool-tip">
        <img className="popup__status-image" src={image} alt={title} />
        <h2 className="popup__info-message">{title}</h2>
        <button
          className="popup__close"
          type="button"
          title="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
