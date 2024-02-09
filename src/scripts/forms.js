import {
  editProfileNameInput,
  editProfileDescriptionInput,
  addNewCardCardNameInput,
  addNewCardUrlInput,
  hidePopup,
} from "./popups";
import { prependPlacesList } from "./cards";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardObj = {
    name: addNewCardCardNameInput.value,
    link: addNewCardUrlInput.value,
  };

  prependPlacesList(newCardObj);
  hidePopup();
}

function clearAddCardForm() {
  addNewCardCardNameInput.value = '';
  addNewCardUrlInput.value = '';
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  setProfile();
  hidePopup();
}

function setProfileFormWhenShown() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

function setProfile() {
  profileTitle.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
}



export {
  handleAddCardFormSubmit,
  handleEditProfileFormSubmit,
  setProfileFormWhenShown,
  setProfile,
  clearAddCardForm
};
