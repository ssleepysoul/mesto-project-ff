
// import {initialCards} from './cards'
import {addCard, deleteCard, likeCard} from './card.js'
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
    processSavingStop(popupEditForm);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
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
    addNewCard(cardTemplate, openImagePopup, result);
    closePopup(popupNewCard);
    popupNewCardForm.reset();
    processSavingStop(popupNewCardForm);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}); // слушатель для добавления новой карточки 

function addNewCard (cardTemplate, openImagePopup, result) {
  const addNewCardParams = {
    cardData: result,
    deleteCardFn: deleteCard, 
    cardTemplate,
    openImagePopupFn: openImagePopup, 
    likeCard: toggleLike,
  };
  const cardElement = addCard(addNewCardParams);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.setAttribute('style', 'display:block')
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
        deleteCardFn: deleteCard, 
        cardTemplate, 
        openImagePopupFn: openImagePopup, 
        likeCard: toggleLike,
        profileId
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
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
  closePopup(popupConfirm);
}) //удаление карточки в попапе подтверждения удаления


function toggleLike(likeElement) {
  const userId = document.body.dataset.userId;
  let likeCard = likeElement.closest('.card');
  let likeCardId = likeCard.dataset.id;
  const likesId = likeCard.dataset.idLikes;
  if(likesId.includes(userId)) {
    deleteLike(likeCardId)
    .then((result) => {
      likeElement.classList.remove('card__like-button_is-active');
      let cardLikes = result.likes.map(function(item) {
        return item._id
      }).join(',');
      likeCard.setAttribute('data-id-likes', cardLikes);
      if(result.likes.length === 0){
        const likeCounter = likeCard.querySelector('.card__like-counter');
        likeCounter.classList.add('visibility-hidden');
      } else {
        const likeCounter = likeCard.querySelector('.card__like-counter');
        likeCounter.textContent = result.likes.length;
        likeCounter.classList.remove('visibility-hidden');
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    }); 
  } else {
    putLike(likeCardId)
    .then((result) => {
      likeElement.classList.add('card__like-button_is-active');
      let cardLikes = result.likes.map(function(item) {
        return item._id
      }).join(',');
      likeCard.setAttribute('data-id-likes', cardLikes);
      if(result.likes.length > 0){
        const likeCounter = likeCard.querySelector('.card__like-counter');
        likeCounter.textContent = result.likes.length;
        likeCounter.classList.remove('visibility-hidden');
      }
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    }); 
  }
}//функция для постановки и снятия лайка


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
    processSavingStop(popupEditAvatarForm);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
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