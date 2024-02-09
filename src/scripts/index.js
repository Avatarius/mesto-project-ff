import "../pages/index.css";
import {
  initialCards,
  placesList,
  addCard,
  removeCard,
  likeCard,
  openImagePopup,
} from "./cards";
import {
  openModal,
  closeModal,
  addNewCardPopup,
  editProfilePopup,
  clearAddNewCardForm,
  setProfileForm,
  handleAddCardFormSubmit,
  handleEditProfileFormSubmit,
} from "./modal";

// показать дефолтные карточки
initialCards.forEach((item) =>
  placesList.append(addCard(item, removeCard, likeCard, openImagePopup))
);

//кнопки открытия попапов
const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

// формы попапов
const addNewCardForm = addNewCardPopup.querySelector(".popup__form");
const editProfileForm = editProfilePopup.querySelector(".popup__form");

// открытие попапов
addCardButton.addEventListener("click", function () {
  clearAddNewCardForm();
  openModal(addNewCardPopup);
});
profileEditButton.addEventListener("click", function () {
  setProfileForm();
  openModal(editProfilePopup);
});

//закрытие попапов
document.addEventListener("mousedown", function (evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  }
});

// submit
addNewCardForm.addEventListener("submit", handleAddCardFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
