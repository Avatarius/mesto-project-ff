import "../pages/index.css";
import { initialCards } from "./cards";
import { addCard, removeCard, likeCard } from "./card";
import { openModal, closeModal } from "./modal";

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
    button: popup.querySelector('.popup__button'),
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

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
  inputElement.classList.add("popup__input_error");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove("popup__input-error_active");
  inputElement.classList.remove("popup__input_error");
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.classList.remove("popup__button_inactive");
  }
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(inputElement.dataset.valueMissingError);
  } else {
    inputElement.setCustomValidity("");
  }

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternMismatchError);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// показать дефолтные карточки
initialCards.forEach((item) => placesList.append(addCard(item, funcObj)));

// открытие попапов
addCardButton.addEventListener("click", function () {
  clearAddNewCardForm(addNewCardPopupObj);
  toggleButtonState([addNewCardPopupObj.inputName, addNewCardPopupObj.inputDetails], addNewCardPopupObj.button);
  // скрытие ошибок при открытии
  hideInputError(addNewCardPopupObj.form, addNewCardPopupObj.inputName);
  hideInputError(addNewCardPopupObj.form, addNewCardPopupObj.inputDetails);
  openModal(addNewCardPopupObj.popup);
});
profileEditButton.addEventListener("click", function () {
  setProfileForm(editProfilePopupObj);
  // скрытие ошибок при открытии
  hideInputError(editProfilePopupObj.form, editProfilePopupObj.inputName);
  hideInputError(editProfilePopupObj.form, editProfilePopupObj.inputDetails);
  openModal(editProfilePopupObj.popup);
});

// submit
addNewCardPopupObj.form.addEventListener("submit", handleAddCardFormSubmit);
editProfilePopupObj.form.addEventListener(
  "submit",
  handleEditProfileFormSubmit
);

enableValidation();
