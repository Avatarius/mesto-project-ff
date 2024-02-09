import { openModal, imagePopupObj } from "./modal";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function addCard(cardObj, removeFunc, likeFunc) {
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
  placesList.addEventListener("click", (event) => openImagePopup(event.target));
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

// открытие попапа
function openImagePopup(target) {
  if (target.classList.contains("card__image")) {
    imagePopupObj.img.src = target.src;
    imagePopupObj.img.alt = target.alt;
    imagePopupObj.caption.textContent = target.alt;
    openModal(imagePopupObj.popup);
  }
}

// добавить новую карточку в начало
function prependPlacesList(cardObj) {
  placesList.prepend( addCard(cardObj, removeCard, likeCard, openImagePopup ) );
}


export {
  initialCards,
  placesList,
  addCard,
  removeCard,
  likeCard,
  openImagePopup,
  prependPlacesList,
};
