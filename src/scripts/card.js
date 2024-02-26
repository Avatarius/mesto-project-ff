const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function addCard(cardObj, funcObj) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const { name, link, likes } = cardObj;
  const { removeFunc, likeFunc, imgClickFunc } = funcObj;
  const title = cardElement.querySelector(".card__title");
  const img = cardElement.querySelector(".card__image");
  const removeBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector('.card__like-counter');

  title.textContent = name;
  img.alt = name;
  img.src = link;
  likeCounter.textContent = likes.length;

  removeBtn.addEventListener("click", removeFunc);
  likeBtn.addEventListener("click", likeFunc);
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

export { addCard, removeCard, likeCard };
