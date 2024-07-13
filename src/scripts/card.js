export function addCard (cardParams) {
  const cardElement = cardParams.cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardParams.cardData.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardParams.cardData.link;
  cardImage.alt = cardParams.cardData.name;
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const popupImage = document.querySelector('.popup_type_image');
  const image = popupImage.querySelector('.popup__image');
  const like = cardElement.querySelector('.card__like-button');
  const imageCaption = popupImage.querySelector('.popup__caption');

  buttonDelete.addEventListener('click', function () {
    cardParams.deleteCardFn(cardElement);
  });

  cardImage.addEventListener('click', function() {
    cardParams.openImagePopupFn(image, cardImage, imageCaption);
  })

  like.addEventListener('click', function () {
    cardParams.likeCard (like);
  })

  return cardElement;
} // функция добавления карточек 

export function deleteCard (cardElement) {
  cardElement.remove();
} // функция удаления карточки


export function likeCard (likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}

