const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "6aa9cfa4-9e37-45ec-86e7-4ccce0f3abad",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  return res.then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

function getProfileInfoApi() {
  return getResponseData(
    fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
  );
}

function getCardListApi() {
  return getResponseData(
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
  );
}

function setProfileInfoApi(name, about) {
  return getResponseData(
    fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
  );
}

function addCardApi(name, link) {
  return getResponseData(
    fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
  );
}

function removeCardApi(cardId) {
  return getResponseData(
    fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
  );
}

function getLikesApi(cardId) {
  return getResponseData(
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      headers: config.headers,
    })
  );
}

function likeCardApi(cardId, isAlreadyLiked) {
  const requestMethod = "PUT";
  return getResponseData(
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: requestMethod,
      headers: config.headers,
    })
  );
}

function setProfileAvatar(url) {
  return getResponseData(
    fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    })
  );
}

export {
  getProfileInfoApi,
  setProfileInfoApi,
  getCardListApi,
  addCardApi,
  removeCardApi,
  getLikesApi,
  likeCardApi,
  setProfileAvatar,
};
