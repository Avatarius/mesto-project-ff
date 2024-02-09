import { prependPlacesList } from "./cards";

const addNewCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");

const addNewCardCardNameInput = addNewCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const addNewCardUrlInput = addNewCardPopup.querySelector(
  ".popup__input_type_url"
);
const editProfileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const editProfileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);

const imagePopupImg = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.openedPopup = popup;
  document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalWithEsc);
}

function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(evt.currentTarget.openedPopup);
  }
}

function clearAddNewCardForm() {
  addNewCardCardNameInput.value = "";
  addNewCardUrlInput.value = "";
}

function setProfileForm() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

function setProfile() {
  profileTitle.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log("submit");
  setProfile();
  closeModal(editProfilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardObj = {
    name: addNewCardCardNameInput.value,
    link: addNewCardUrlInput.value,
  };
  prependPlacesList(newCardObj);
  closeModal(addNewCardPopup);
}

export {
  openModal,
  closeModal,
  addNewCardPopup,
  editProfilePopup,
  imagePopup,
  imagePopupImg,
  imagePopupCaption,
  clearAddNewCardForm,
  setProfileForm,
  handleAddCardFormSubmit,
  handleEditProfileFormSubmit,
};
