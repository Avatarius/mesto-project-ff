const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '6aa9cfa4-9e37-45ec-86e7-4ccce0f3abad',
    'Content-Type': 'application/json'
  }
}


function getProfileInfoApi() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    }
  })
}

function getCardListApi() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    }
  });
}

function setProfileInfoApi(profileObj) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      name: profileObj.name,
      about: profileObj,
    })
  });
}

function addCardApi(cardObj) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      name: cardObj.name,
      link: cardObj.link,
    })
  });
}


export { getProfileInfoApi, setProfileInfoApi, getCardListApi, addCardApi };
