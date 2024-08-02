import { openPopup } from "./modal";

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

  cardElement.setAttribute('data-id', `${cardParams.cardData._id}`);
  let cardLikes = cardParams.cardData.likes.map(function(item) {
    return item._id
  }).join(',');
  cardElement.setAttribute('data-id-likes', cardLikes);

  if(cardParams.cardData.likes.length > 0){
    const likeCounter = cardElement.querySelector('.card__like-counter');
    likeCounter.textContent = cardParams.cardData.likes.length;
    likeCounter.classList.remove('visibility-hidden');
  }

  if(cardParams.cardData.owner._id !== cardParams.profileId) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.setAttribute('style', 'display:none')
  }

  const likesId = cardElement.dataset.idLikes;
  if(likesId.includes(cardParams.profileId)) {
    like.classList.add('card__like-button_is-active');
  }
    
  buttonDelete.addEventListener('click', function (evt) {
    const popupConfirm = document.querySelector('.popup_type_confirm');
    let cardElem = evt.target.closest('.card');
    let cardId = cardElem.dataset.id; // получение значения атрибута из cardElement
    popupConfirm.setAttribute('data-card-id', `${cardId}`);
    openPopup(popupConfirm);
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


