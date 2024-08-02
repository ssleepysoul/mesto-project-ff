
let closePopupEscapeEventHandlerWithBind;


function closePopupEscapeEventHandler (popup, event) {
  if(event.key === 'Escape') {
    closePopup(popup);
  }
} // функция закрытия попапа по escape


export function openPopup(popup){
  popup.classList.add('popup_is-opened');

  closePopupEscapeEventHandlerWithBind = closePopupEscapeEventHandler.bind(document, popup);

  document.addEventListener('keydown', closePopupEscapeEventHandlerWithBind);
} // функция открытия попапа с добавлением слушателей закрытия попапа по escape

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscapeEventHandlerWithBind);
} //функция закрытия попапа и удаление слушателей













