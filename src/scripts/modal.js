
let closePopupEventHandlerWithBind;
let closePopupEscapeEventHandlerWithBind;
let closePopupOverlayEventHandlerWithBind;

function closePopupEventHandler (popup, closePopupCallbackFn, event) {
  closePopup(popup, closePopupCallbackFn);
} // функция закрытия попапа для крестика в попапе

function closePopupEscapeEventHandler (popup, closePopupCallbackFn, event) {
  if(event.key === 'Escape') {
    closePopup(popup, closePopupCallbackFn);
  }
} // функция закрытия попапа по escape

function closePopupOverlayEventHandler (popup, closePopupCallbackFn, event) {
  if(event.target === popup) {
    closePopup(popup, closePopupCallbackFn);
  }
} // функция закрытия попапа по оверлею

export function openPopup(popup, openPopupCallbackFn, closePopupCallbackFn){
  popup.classList.add('popup_is-opened');
  const buttonPopupClose = popup.querySelector('.popup__close');

  closePopupEventHandlerWithBind = closePopupEventHandler.bind(buttonPopupClose, popup, closePopupCallbackFn);
  closePopupEscapeEventHandlerWithBind = closePopupEscapeEventHandler.bind(document, popup, closePopupCallbackFn);
  closePopupOverlayEventHandlerWithBind = closePopupOverlayEventHandler.bind(popup, popup, closePopupCallbackFn);

  buttonPopupClose.addEventListener('click', closePopupEventHandlerWithBind);
  document.addEventListener('keydown', closePopupEscapeEventHandlerWithBind);
  popup.addEventListener('click', closePopupOverlayEventHandlerWithBind);
  if(openPopupCallbackFn) {
    openPopupCallbackFn();
  }
} // функция открытия попапа с добавлением слушателей закрытия попапа

export function closePopup(popup, closePopupCallbackFn) {
  popup.classList.remove('popup_is-opened');
  const buttonPopupClose = popup.querySelector('.popup__close');
  buttonPopupClose.removeEventListener('click', closePopupEventHandlerWithBind);
  document.removeEventListener('keydown', closePopupEscapeEventHandlerWithBind);
  popup.removeEventListener('click', closePopupOverlayEventHandlerWithBind);
  if(closePopupCallbackFn) {
    closePopupCallbackFn();
  }
} //функция закрытия попапа и удаление слушателей














