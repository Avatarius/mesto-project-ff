import "../pages/index.css";
import { initialCards } from "./cards";
import { addCard, removeCard, likeCard } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";

// функции для генерации DOM объектов
function constructAddOrEditPopupObj(
  popupClass,
  inputNameClass,
  inputDetailsClass
) {
  const popup = document.querySelector(popupClass);
  return {
    popup,
    form: popup.querySelector(".popup__form"),
    inputName: document.querySelector(inputNameClass),
    inputDetails: document.querySelector(inputDetailsClass),
    button: popup.querySelector(".popup__button"),
  };
}

function constructImagePopupObj(popupClass, imgClass, captionClass) {
  return {
    popup: document.querySelector(popupClass),
    img: document.querySelector(imgClass),
    caption: document.querySelector(captionClass),
  };
}
// DOM объекты
const addNewCardPopupObj = constructAddOrEditPopupObj(
  ".popup_type_new-card",
  ".popup__input_type_card-name",
  ".popup__input_type_url"
);
const editProfilePopupObj = constructAddOrEditPopupObj(
  ".popup_type_edit",
  ".popup__input_type_name",
  ".popup__input_type_description"
);
const imagePopupObj = constructImagePopupObj(
  ".popup_type_image",
  ".popup__image",
  ".popup__caption"
);
// объект с настройками для валидации
const validationObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  errorSelector: ".popup__input-error",
  inputErrorClass: "popup__input_error",
  errorActiveClass: "popup__input-error_active",
};

// список с карточками
const placesList = document.querySelector(".places__list");

// Данные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// кнопки открытия попапов
const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

// Объект с функциями
const funcObj = {
  removeFunc: removeCard,
  likeFunc: likeCard,
  imgClickFunc: handleCardImgClick,
};

// очистка формы добавления карточки при открытии попапа
function clearAddNewCardForm(popupObj) {
  popupObj.inputName.value = "";
  popupObj.inputDetails.value = "";
}

// Заполнить форму изменения профиля данными со страницы при открытии попапа
function setProfileForm(popupObj) {
  popupObj.inputName.value = profileTitle.textContent;
  popupObj.inputDetails.value = profileDescription.textContent;
}

// Изменение данных профиля при сабмите
function setProfile(popupObj) {
  profileTitle.textContent = popupObj.inputName.value;
  profileDescription.textContent = popupObj.inputDetails.value;
}

// задать картинку попапа с картинкой при открытии попапа
function setCardImage(popupObj, img) {
  popupObj.img.src = img.src;
  popupObj.img.alt = img.alt;
  popupObj.caption.textContent = img.alt;
}

// обработчики submit
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  setProfile(editProfilePopupObj);
  closeModal(editProfilePopupObj.popup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardObj = {
    name: addNewCardPopupObj.inputName.value,
    link: addNewCardPopupObj.inputDetails.value,
  };
  placesList.prepend(addCard(newCardObj, funcObj));
  closeModal(addNewCardPopupObj.popup);
}

// обработчик клика по картинке карточки
function handleCardImgClick(evt) {
  setCardImage(imagePopupObj, evt.target);
  openModal(imagePopupObj.popup);
}

// показать дефолтные карточки
initialCards.forEach((item) => placesList.append(addCard(item, funcObj)));


// открытие попапов
addCardButton.addEventListener("click", function () {
  clearAddNewCardForm(addNewCardPopupObj);
  clearValidation(addNewCardPopupObj.form, validationObj);
  openModal(addNewCardPopupObj.popup);
});
profileEditButton.addEventListener("click", function () {
  setProfileForm(editProfilePopupObj);
  clearValidation(editProfilePopupObj.form, validationObj);
  openModal(editProfilePopupObj.popup);
});

// submit
addNewCardPopupObj.form.addEventListener("submit", handleAddCardFormSubmit);
editProfilePopupObj.form.addEventListener(
  "submit",
  handleEditProfileFormSubmit
);

enableValidation(validationObj);
