import {
  editProfileNameInput,
  editProfileDescriptionInput,
  addNewCardCardNameInput,
  addNewCardUrlInput,
  hidePopup,
} from "./popups";
import { addCard } from "./cards";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  let newCardObj = {};
  newCardObj[addNewCardCardNameInput.value] = addNewCardUrlInput.value;
  // addCard(newCardObj);
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

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  setProfile();
  hidePopup();
}

export {
  handleAddCardFormSubmit,
  handleEditProfileFormSubmit,
  setProfileFormWhenShown,
  setProfile,
};
