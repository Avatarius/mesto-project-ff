import { prependPlacesList } from "./cards";

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
  addNewCardPopupObj.inputName.value = "";
  addNewCardPopupObj.inputDetails.value = "";
}

function setProfileForm() {
  editProfilePopupObj.inputName.value = profileTitle.textContent;
  editProfilePopupObj.inputDetails.value = profileDescription.textContent;
}

function setProfile() {
  profileTitle.textContent = editProfilePopupObj.inputName.value;
  profileDescription.textContent = editProfilePopupObj.inputDetails.value;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  setProfile();
  closeModal(editProfilePopupObj.popup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardObj = {
    name: addNewCardPopupObj.inputName.value,
    link: addNewCardPopupObj.inputDetails.value,
  };
  prependPlacesList(newCardObj);
  closeModal(addNewCardPopupObj.popup);
}

export {
  openModal,
  closeModal,
  addNewCardPopupObj,
  editProfilePopupObj,
  imagePopupObj,
  clearAddNewCardForm,
  setProfileForm,
  handleAddCardFormSubmit,
  handleEditProfileFormSubmit,
};
