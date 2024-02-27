const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function addCard(cardObj, funcObj) {

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const { owner: {_id: ownerId}, _id: id, name, link, likes, isRemoveButtonVisible } = cardObj;
  const { removeFunc, likeFunc, imgClickFunc } = funcObj;
  const title = cardElement.querySelector(".card__title");
  const img = cardElement.querySelector(".card__image");
  const removeBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector('.card__like-counter');
  if (!isRemoveButtonVisible) {
    removeBtn.classList.add('card__delete-button_hidden');
  }

  title.textContent = name;
  img.alt = name;
  img.src = link;
  likeCounter.textContent = likes.length;



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

export { addCard, removeCard, likeCard };
