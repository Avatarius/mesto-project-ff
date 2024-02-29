const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function addCard(cardObj, funcObj) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const {
    owner: { _id: ownerId },
    _id: cardId,
    myId,
    name,
    link,
    likes,
  } = cardObj;
  const { removeFunc, likeFunc, imgClickFunc } = funcObj;
  const title = cardElement.querySelector(".card__title");
  const img = cardElement.querySelector(".card__image");
  const removeBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");
  // обновим состояние элементов карточки
  if (ownerId !== myId) {
    removeBtn.classList.add("card__delete-button_hidden");
  }
  if (likes.length > 0 && likes.some((item) => item._id === myId)) {
    likeBtn.classList.add("card__like-button_is-active");
  }
  updateLikeCounter(likeBtn, likes.length);

  title.textContent = name;
  img.alt = name;
  img.src = link;

  removeBtn.addEventListener("click", (evt) => removeFunc(removeBtn, cardId));
  likeBtn.addEventListener("click", (evt) => likeFunc(likeBtn, cardId));
  img.addEventListener("click", imgClickFunc);

  return cardElement;
}

// Функция удаления карточки
function removeCard(button) {
  button.closest(".card").remove();
}

// лайк
function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

// обновляем счетчик лайков
function updateLikeCounter(button, count) {
  const counter = button.closest(".card").querySelector(".card__like-counter");
  counter.textContent = count;
}

export { addCard, removeCard, likeCard, updateLikeCounter };
