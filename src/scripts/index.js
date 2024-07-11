
import {initialCards} from './cards'
import {addCard, deleteCard, addNewCard, likeCard} from './card.js'
import {openPopup, closePopup} from './modal.js'


const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');


initialCards.forEach(function (item) {
  const cardElement = addCard(item, deleteCard, cardTemplate, openImagePopup, likeCard);
  cardList.append(cardElement);
}); // автоматическое добавление карточек на страницу при загрузке

buttonProfileEdit.addEventListener('click', function(){
  openPopup(popupEdit, editPopupOpenCallback, removeEventListenerPopupEdit);
}); //слушатель для открытия попапа с автозаполнением полей

function popupEditSubmitEventHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit, removeEventListenerPopupEdit);
} //функция для сохранения редактирования

function editPopupOpenCallback () {
  autofillInputsPopupEdit(nameInput, descriptionInput, profileTitle, profileDescription); // автозаполнение полей 
  popupEdit.addEventListener('submit', popupEditSubmitEventHandler); //слушатель для сохранения редактирования 
} 

function removeEventListenerPopupEdit () {
  popupEdit.removeEventListener('submit', popupEditSubmitEventHandler); //снятие слушателя для сохранения редактирования 
} //функция для удаления слушателей при закрытии popupEdit

function popupNewCardOpenCallback () {
  popupNewCard.addEventListener('submit', openPopupNewCard);  // слушатель для добавления новой карточки 
}

function removeEventListenerPopupNewCard () {
  popupNewCard.removeEventListener('submit', openPopupNewCard);  //снятие слушателя для добавления новой карточки 
}

buttonAddNewCard.addEventListener('click', function(){
  openPopup(popupNewCard,popupNewCardOpenCallback, removeEventListenerPopupNewCard);
});//слушатель для открытия попапа добавления карточки

function openPopupNewCard (evt) {
  evt.preventDefault();
  addNewCard(cardTemplate, cardList, openImagePopup);
  closePopup(popupNewCard, removeEventListenerPopupNewCard);
  const popupForm = popupNewCard.querySelector('.popup__form');
  popupForm.reset();
} //

function autofillInputsPopupEdit (nameInput, descriptionInput, profileTitle, profileDescription) {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
} //функция автозаполнения полей формы редактирования


function openImagePopup(image, cardImage) {
  image.src = cardImage.src;
  image.alt = cardImage.alt;
  openPopup(popupImage, null, null);
}
