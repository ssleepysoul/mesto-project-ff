
import {initialCards} from './cards'
import {addCard, deleteCard, likeCard} from './card.js'
import {openPopup, closePopup} from './modal.js'


const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm  = popupEdit.querySelector('.popup__form');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupNewCardName = popupNewCard.querySelector('.popup__input_type_card-name');
const popupNewCardImageUrl = popupNewCard.querySelector('.popup__input_type_url');



initialCards.forEach(function (cardData) {
  const addCardParams = {
    cardData, 
    deleteCardFn: deleteCard, 
    cardTemplate, 
    openImagePopupFn: openImagePopup, 
    likeCard
  };
  const cardElement = addCard(addCardParams);
  cardList.append(cardElement);
}); // автоматическое добавление карточек на страницу при загрузке


buttonProfileEdit.addEventListener('click', function(){
  openPopup(popupEdit);
  autofillInputsPopupEdit(nameInput, descriptionInput, profileTitle, profileDescription);
}); //слушатель для открытия попапа с автозаполнением полей

popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEdit);
});

popupEdit.addEventListener('click', function (event) {
  if(event.target === popupEdit) {
    closePopup(popupEdit);
  }
});

function autofillInputsPopupEdit (nameInput, descriptionInput, profileTitle, profileDescription) {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
} //функция автозаполнения полей формы редактирования

popupEditForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit);
}); //слушатель для сохранения редактирования 

buttonAddNewCard.addEventListener('click', function(){
  openPopup(popupNewCard);
});//слушатель для открытия попапа добавления карточки

popupNewCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addNewCard(cardTemplate, cardList, openImagePopup);
  closePopup(popupNewCard);
  popupNewCardForm.reset();
});  // слушатель для добавления новой карточки 

function addNewCard (cardTemplate, openImagePopup) {
  const cardData = {
    name: popupNewCardName.value,
    link: popupNewCardImageUrl.value
  };
  const addNewCardParams = {
    cardData, 
    deleteCardFn: deleteCard, 
    cardTemplate, 
    openImagePopupFn: openImagePopup, 
    likeCard
  };
  const cardElement = addCard(addNewCardParams);
  cardList.prepend(cardElement);
} // функция добавления новой карточки через попап добавления

popupNewCardCloseButton.addEventListener('click', function () {
  closePopup(popupNewCard);
});

popupNewCard.addEventListener('click', function (event) {
  if(event.target === popupNewCard) {
    closePopup(popupNewCard);
  }
});

function openImagePopup(image, cardImage, imageCaption) {
  image.src = cardImage.src;
  image.alt = cardImage.alt;
  imageCaption.textContent = cardImage.alt;
  openPopup(popupImage);
} // открытие картинки

popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});

popupImage.addEventListener('click', function (event) {
  if(event.target === popupImage) {
    closePopup(popupImage);
  }
});



