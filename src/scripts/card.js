const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function addCard(cardObj, funcObj) {

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const { owner: {_id: ownerId}, _id: id, myId, name, link, likes } = cardObj;
  const { removeFunc, likeFunc, imgClickFunc } = funcObj;
  const title = cardElement.querySelector(".card__title");
  const img = cardElement.querySelector(".card__image");
  const removeBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector('.card__like-counter');
  // обновим состояние элементов карточки
  if (ownerId !== myId) {
    removeBtn.classList.add('card__delete-button_hidden');
  }
  if (likes.length > 0 && likes.some(item => item._id === myId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }
  updateLikeCounter(likeCounter, cardObj.likes.length);

  title.textContent = name;
  img.alt = name;
  img.src = link;

  removeBtn.addEventListener("click", (evt) => removeFunc(evt, id));
  likeBtn.addEventListener("click", (evt) => likeFunc(evt, id));
  img.addEventListener("click", imgClickFunc);

  return cardElement;
}

// Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".card").remove();
}

// лайк
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function updateLikeCounter(counter, count) {
  counter.textContent = count;
}

export { addCard, removeCard, likeCard, updateLikeCounter };
