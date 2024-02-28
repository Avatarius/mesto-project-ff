const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "6aa9cfa4-9e37-45ec-86e7-4ccce0f3abad",
    "Content-Type": "application/json",
  },
};

function getProfileInfoApi() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

function getCardListApi() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

function setProfileInfoApi(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

function addCardApi(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

function removeCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

function likeCardApi(cardId, isAlreadyLiked) {
  const requestMethod = isAlreadyLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: requestMethod,
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

function setProfileAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: url,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
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
