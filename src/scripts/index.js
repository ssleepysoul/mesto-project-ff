
// import {initialCards} from './cards'
import {addCard, toggleLike} from './card.js'
import {openPopup, closePopup} from './modal.js'
import {enableValidation, clearValidation} from './validation.js';
import {editProfile, postNewCard, getProfileInfo, getCardsInfo, deletingCard, deleteLike, putLike, patchAvatar} from './api.js';


const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmCloseButton = popupConfirm.querySelector('.popup__close');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm  = popupEdit.querySelector('.popup__form');
const popupEditNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupEditDescriptionInput = popupEdit.querySelector('.popup__input_type_description');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');


const popupNewCardName = popupNewCard.querySelector('.popup__input_type_card-name');
const popupNewCardImageUrl = popupNewCard.querySelector('.popup__input_type_url');

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error-visible'
};

const popupEditAvatar = document.querySelector('.popup_type_edit_avatar');
const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form')
const popupEditAvatarCloseButton = popupEditAvatar.querySelector('.popup__close');
const popupEditAvatarInput = popupEditAvatarForm.querySelector('.popup__input');

buttonProfileEdit.addEventListener('click', function(){
  openPopup(popupEdit);
  autofillInputsPopupEdit(popupEditNameInput, popupEditDescriptionInput, profileTitle, profileDescription);
  clearValidation(formConfig, popupEditForm, false);
}); //слушатель для открытия попапа с автозаполнением полей; добавила скрытие ошибок при открытии попапа и добавила toggleButtonState, чтобы при открытии попапа кнопка была активна

popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEdit);
}); 

popupEdit.addEventListener('click', function (event) {
  if(event.target === popupEdit) {
    closePopup(popupEdit);
  }
});

function autofillInputsPopupEdit (popupEditNameInput, popupEditDescriptionInput, profileTitle, profileDescription) {
  popupEditNameInput.value = profileTitle.textContent;
  popupEditDescriptionInput.value = profileDescription.textContent;
} //функция автозаполнения полей формы редактирования


popupEditForm.addEventListener('submit', function (event) {
  event.preventDefault();  
  processSavingStart(popupEditForm);
  editProfile (popupEditNameInput.value, popupEditDescriptionInput.value)
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    closePopup(popupEdit);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    processSavingStop(popupEditForm);
  })
}) //отправка запроса на сервер с обновленной информацией о пользователе

buttonAddNewCard.addEventListener('click', function(){
  openPopup(popupNewCard);
  clearValidation(formConfig, popupNewCardForm, true);
});//слушатель для открытия попапа добавления карточки; скрытие ошибок валидации


popupNewCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  processSavingStart(popupNewCardForm);
  postNewCard (popupNewCardName.value, popupNewCardImageUrl.value)
  .then((result) => {
    addNewCard(cardTemplate, openCardImage, result);
    closePopup(popupNewCard);
    popupNewCardForm.reset();
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    processSavingStop(popupNewCardForm);
  })
}); // слушатель для добавления новой карточки 

function addNewCard (cardTemplate, openCardImage, result) {
  const profileId = document.body.dataset.userId;
  const addNewCardParams = {
    cardData: result,
    cardTemplate,
    openImagePopupFn: openCardImage, 
    openPopup,
    profileId,
    deleteLike,
    putLike,
    openDeleteConfirmPopup,
    toggleLike
  };
  const cardElement = addCard(addNewCardParams);
  cardList.prepend(cardElement);
}// функция добавления новой карточки через попап добавления

popupNewCardCloseButton.addEventListener('click', function () {
  closePopup(popupNewCard);
}); //слушатель для закрытия попапа добавления карточки по крестику

popupNewCard.addEventListener('click', function (event) {
  if(event.target === popupNewCard) {
    closePopup(popupNewCard);
  }
}); //функция закрытия попапа по клику на фон


popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});

popupImage.addEventListener('click', function (event) {
  if(event.target === popupImage) {
    closePopup(popupImage);
  }
});

// 7 проект

enableValidation(formConfig);

Promise.all([
  getProfileInfo(),
  getCardsInfo()
]).then((result) => {
    const profile = result[0];
    const cards = result [1];
    const profileId = result[0]._id;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
    document.body.setAttribute('data-user-id', profileId);

    cards.forEach(function (cardData) {
      const addCardParams = {
        cardData, 
        cardTemplate, 
        openImagePopupFn: openCardImage, 
        profileId,
        openPopup,
        deleteLike,
        putLike,
        openDeleteConfirmPopup,
        toggleLike
    };
      const cardElement = addCard(addCardParams);
      cardList.append(cardElement);
    });
  }
).catch((err) => {
  console.log(err); // выводим ошибку в консоль
}); 
  //информация из объектов подставляется на страницу

  popupConfirmCloseButton.addEventListener('click', function() {
    closePopup(popupConfirm);
  }) // слушатель для закрытия попапа(по крестику и escape)

  popupConfirm.addEventListener('click', function (event) {
  if(event.target === popupConfirm) {
    closePopup(popupConfirm);
  }
}); // слушатель для закрытия попапа по клику на фон

popupConfirmButton.addEventListener('click', function(evt) {
  const popupConfirm = evt.target.closest('.popup_type_confirm');
  let cardId = popupConfirm.dataset.cardId;
  deletingCard(cardId)
  .then((result) => {
    let deleteCard = document.querySelector(`[data-id="${cardId}"]`);
    deleteCard.remove();
    closePopup(popupConfirm);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}) //удаление карточки в попапе подтверждения удаления


profileAvatar.addEventListener('click', function() {
  openPopup(popupEditAvatar);
  clearValidation(formConfig, popupEditAvatarForm, true);
}) //открытие попапа редактирования аватара с очисткой полей и ошибок валидации


popupEditAvatarCloseButton.addEventListener('click', function () {
  closePopup(popupEditAvatar);
}); // закрытие попапа редактирования аватара по клику на крестик

popupEditAvatar.addEventListener('click', function (event) {
  if(event.target === popupEditAvatar) {
    closePopup(popupEditAvatar);
  }
}); //закрытие попапа по клику на фон 


popupEditAvatarForm.addEventListener('submit', function(event) {
  event.preventDefault();
  processSavingStart(popupEditAvatarForm);
  patchAvatar(popupEditAvatarInput.value)
  .then((result) => {
    profileAvatar.style.backgroundImage = `url(${result.avatar})`;
    closePopup(popupEditAvatar);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    processSavingStop(popupEditAvatarForm);
  })
}) //отправка формы на изменение аватара

function processSavingStart(formElement) {
  const button = formElement.querySelector('.popup__button');
  button.textContent = 'Сохранение...'
}

function processSavingStop(formElement) {
  setTimeout(() => {
    const button = formElement.querySelector('.popup__button');
    button.textContent = 'Сохранить'
  }, 400)
}


function openCardImage(cardImageSrc, cardImageAlt) {
  popupImageImage.src = cardImageSrc;
  popupImageImage.alt = cardImageAlt;
  popupImageCaption.textContent = cardImageAlt;
  openPopup(popupImage);
}

function openDeleteConfirmPopup(cardId) {
  popupConfirm.setAttribute('data-card-id', `${cardId}`);
  openPopup(popupConfirm);
}