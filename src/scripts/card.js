const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function addCard(cardObj, removeFunc, likeFunc, handeImgClickFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const { name, link } = cardObj;

  const title = cardElement.querySelector(".card__title");
  const img = cardElement.querySelector(".card__image");
  const removeBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");

  title.textContent = name;
  img.alt = name;
  img.src = link;

  removeBtn.addEventListener("click", (event) => removeFunc(event.target));
  likeBtn.addEventListener("click", (event) => likeFunc(event.target));
  img.addEventListener("click", handeImgClickFunc);

  return cardElement;
}

// Функция удаления карточки
function removeCard(target) {
  target.closest(".card").remove();
}

// лайк
function likeCard(target) {
  target.classList.toggle("card__like-button_is-active");
}

export { placesList, addCard, removeCard, likeCard };
