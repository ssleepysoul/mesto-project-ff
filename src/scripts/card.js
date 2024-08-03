
export function addCard (cardParams) {
  const cardElement = cardParams.cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardParams.cardData.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardParams.cardData.link;
  cardImage.alt = cardParams.cardData.name;
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const like = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

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
    cardParams.openDeleteConfirmPopup(cardParams.cardData._id)
  });

  cardImage.addEventListener('click', function() {
    cardParams.openImagePopupFn(cardImage.src, cardImage.alt);
  })

  like.addEventListener('click', function () {
    const likeCardId = cardElement.dataset.id;
    const likesId = cardElement.dataset.idLikes;
    if(likesId.includes(cardParams.profileId)) {
      cardParams.deleteLike(likeCardId)
      .then((result) => {
        like.classList.remove('card__like-button_is-active');
        let cardLikes = result.likes.map(function(item) {
          return item._id
        }).join(',');
        cardElement.setAttribute('data-id-likes', cardLikes);
        if(result.likes.length === 0){
          likeCounter.classList.add('visibility-hidden');
        } else {
          likeCounter.textContent = result.likes.length;
          likeCounter.classList.remove('visibility-hidden');
        }
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
    } else {
      cardParams.putLike(likeCardId)
      .then((result) => {
        like.classList.add('card__like-button_is-active');
        let cardLikes = result.likes.map(function(item) {
          return item._id
        }).join(',');
        cardElement.setAttribute('data-id-likes', cardLikes);
        if(result.likes.length > 0){
          likeCounter.textContent = result.likes.length;
          likeCounter.classList.remove('visibility-hidden');
        }
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
    }
    // cardParams.likeCard (like);
  })

  return cardElement;
} // функция добавления карточек 

export function deleteCard (cardElement) {
  cardElement.remove();
} // функция удаления карточки
