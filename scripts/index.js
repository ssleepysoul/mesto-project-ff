// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function addCard (cardData, deleteCardFn) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardData.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  buttonDelete.addEventListener('click', function () {
    deleteCardFn(cardElement);
  });
  return cardElement;
}

function deleteCard (cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (item) {
  const cardElement = addCard(item, deleteCard);
  cardList.append(cardElement);
});


