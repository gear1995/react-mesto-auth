import PopupWithForm from "./PopupWithForm";
function ConfirmPopup(props) {
  return (
    <PopupWithForm
      name={"confirm"}
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Да"
      //onSubmit={handleSubmit}
      onOverlayClose={props.onOverlayClose}
    ></PopupWithForm>
  );
}
export default ConfirmPopup;
