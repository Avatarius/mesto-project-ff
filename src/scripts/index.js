import "../pages/index.css";
import { initialCards } from "./cards";
import { placesList, addCard, removeCard, likeCard } from "./card";
import {
  openModal,
  closeModal,
  clearAddNewCardForm,
  setProfileForm,
  setProfile,
  setCardImage,
} from "./modal";

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

// формы попапов
const addNewCardForm = addNewCardPopupObj.form;
const editProfileForm = editProfilePopupObj.form;

// кнопки открытия попапов
const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

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
  placesList.prepend(
    addCard(newCardObj, removeCard, likeCard, handleCardImgClick)
  );
  closeModal(addNewCardPopupObj.popup);
}

// обработчик клика по картинке карточки
function handleCardImgClick(evt) {
  if (evt.target.classList.contains("card__image")) {
    setCardImage(evt.target, imagePopupObj);
    openModal(imagePopupObj.popup);
  }
}

// показать дефолтные карточки
initialCards.forEach((item) =>
  placesList.append( addCard(item, removeCard, likeCard, handleCardImgClick) )
);

// открытие попапов
addCardButton.addEventListener("click", function () {
  clearAddNewCardForm(addNewCardPopupObj);
  openModal(addNewCardPopupObj.popup);
});
profileEditButton.addEventListener("click", function () {
  setProfileForm(editProfilePopupObj);
  openModal(editProfilePopupObj.popup);
});

// submit
addNewCardForm.addEventListener("submit", handleAddCardFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
