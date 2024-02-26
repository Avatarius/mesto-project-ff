const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '6aa9cfa4-9e37-45ec-86e7-4ccce0f3abad',
    'Content-Type': 'application/json'
  }
}


function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    }
  })
}

function getCardList() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    }
  })
}


export { getUserInfo, getCardList };
