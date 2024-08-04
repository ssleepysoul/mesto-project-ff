
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
    const toggleLikeParams = {
      cardElement,
      profileId: cardParams.profileId,
      deleteLike: cardParams.deleteLike,
      like,
      likeCounter,
      putLike: cardParams.putLike,
    }
    cardParams.toggleLike(toggleLikeParams)
  })

  return cardElement;
} // функция добавления карточек 


export function toggleLike(toggleLikeParams) {
  const likeCardId = toggleLikeParams.cardElement.dataset.id;
    const likesId = toggleLikeParams.cardElement.dataset.idLikes;
    if(likesId.includes(toggleLikeParams.profileId)) {
      toggleLikeParams.deleteLike(likeCardId)
      .then((result) => {
        toggleLikeParams.like.classList.remove('card__like-button_is-active');
        let cardLikes = result.likes.map(function(item) {
          return item._id
        }).join(',');
        toggleLikeParams.cardElement.setAttribute('data-id-likes', cardLikes);
        if(result.likes.length === 0){
          toggleLikeParams.likeCounter.classList.add('visibility-hidden');
        } else {
          toggleLikeParams.likeCounter.textContent = result.likes.length;
          toggleLikeParams.likeCounter.classList.remove('visibility-hidden');
        }
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
    } else {
      toggleLikeParams.putLike(likeCardId)
      .then((result) => {
        toggleLikeParams.like.classList.add('card__like-button_is-active');
        let cardLikes = result.likes.map(function(item) {
          return item._id
        }).join(',');
        toggleLikeParams.cardElement.setAttribute('data-id-likes', cardLikes);
        if(result.likes.length > 0){
          toggleLikeParams.likeCounter.textContent = result.likes.length;
          toggleLikeParams.likeCounter.classList.remove('visibility-hidden');
        }
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
    }
}

