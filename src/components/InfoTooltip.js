function InfoTooltip({ onClose, infoTooltipMessage, image, isOpen }) {
  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup_opened")) {
      onClose();
    }
  }
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__info-tool-tip">
        <img
          className="popup__status-image"
          src={image}
          alt={infoTooltipMessage}
        />
        <h2 className="popup__info-message">{infoTooltipMessage}</h2>
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
