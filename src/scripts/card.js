import { openPopup } from "./modal";

export function addCard (cardData, deleteCardFn, cardTemplate, openImagePopupFn, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardData.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const popupImage = document.querySelector('.popup_type_image');
  const image = popupImage.querySelector('.popup__image');
  const like = cardElement.querySelector('.card__like-button');

  buttonDelete.addEventListener('click', function () {
    deleteCardFn(cardElement);
  });

  cardImage.addEventListener('click', function() {
    openImagePopupFn(image, cardImage);
  })

  like.addEventListener('click', function () {
    likeCard (like);
  })

  return cardElement;
} // функция добавления карточек 

export function deleteCard (cardElement) {
  cardElement.remove();
} // функция удаления карточки

export function addNewCard (cardTemplate, cardListElement, openImagePopup) {
  const placeName = document.querySelector('.popup__input_type_card-name');
  const linkImage = document.querySelector('.popup__input_type_url');
  const cardData = {
    name: placeName.value,
    link: linkImage.value
  };
  const cardElement = addCard(cardData, deleteCard, cardTemplate, openImagePopup, likeCard);
  cardListElement.prepend(cardElement);
} // функция добавления новой карточки через попап добавления


export function likeCard (likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}

