const authorizationKey = '7c46cc38-bd4c-4046-ace1-77598f6b8fb2';
const serverUrl = 'https://nomoreparties.co/v1/wff-cohort-19/';
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 

export function editProfile (name, about) {
  return fetch(`${serverUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about
    })
  }).then(res => checkResponse(res))
}

export function postNewCard (name, link) {
  return fetch(`${serverUrl}cards`, {
    method: 'POST',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link
    })
  }).then(res => checkResponse(res))
}

export function getProfileInfo() {
  return fetch(`${serverUrl}users/me`, {
    headers: {
      authorization: authorizationKey
    }
  }).then(res => checkResponse(res))}

export function getCardsInfo() {
  return fetch(`${serverUrl}cards`, {
    headers: {
      authorization: authorizationKey
    }
  }).then(res => checkResponse(res))
}

export function deletingCard(cardId) {
  return fetch(`${serverUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorizationKey
    }
  }).then(res => checkResponse(res))
}

export function deleteLike(likeCardId) {
  return fetch(`${serverUrl}cards/likes/${likeCardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorizationKey
    }
  }).then(res => checkResponse(res))
}

export function putLike(likeCardId) {
 return fetch(`${serverUrl}cards/likes/${likeCardId}`, {
  method: 'PUT',
  headers: {
    authorization: authorizationKey
  }
}).then(res => checkResponse(res))
}

export function patchAvatar(avatar) {
  return fetch(`${serverUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar
    })
  }).then(res => checkResponse(res))
}