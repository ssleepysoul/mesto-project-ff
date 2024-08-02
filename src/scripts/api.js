const authorizationKey = '7c46cc38-bd4c-4046-ace1-77598f6b8fb2';

export function editProfile (name, about) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-19/users/me', {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export function postNewCard (name, link) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-19/cards', {
    method: 'POST',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export function getProfileInfo() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-19/users/me', {
    headers: {
      authorization: authorizationKey
    }
  }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export function getCardsInfo() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-19/cards', {
    headers: {
      authorization: authorizationKey
    }
  }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export function deletingCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-19/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorizationKey
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export function deleteLike(likeCardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-19/cards/likes/${likeCardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorizationKey
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export function putLike(likeCardId) {
 return fetch(`https://nomoreparties.co/v1/wff-cohort-19/cards/likes/${likeCardId}`, {
  method: 'PUT',
  headers: {
    authorization: authorizationKey
  }
}).then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
})
}

export function patchAvatar(avatar) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-19/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}