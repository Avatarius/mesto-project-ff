const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "6aa9cfa4-9e37-45ec-86e7-4ccce0f3abad",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function getProfileInfoApi() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponseData);
}

function getCardListApi() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponseData);
}

function setProfileInfoApi(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(getResponseData);
}

function addCardApi(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(getResponseData);
}

function removeCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
}

function likeCardApi(cardId, isAlreadyLiked) {
  const requestMethod = isAlreadyLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: requestMethod,
    headers: config.headers,
  }).then(getResponseData);
}

function setProfileAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(getResponseData);
}

export {
  getProfileInfoApi,
  setProfileInfoApi,
  getCardListApi,
  addCardApi,
  removeCardApi,
  likeCardApi,
  setProfileAvatar,
};
