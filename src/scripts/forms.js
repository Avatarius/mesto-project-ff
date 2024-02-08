import {
  editProfileNameInput,
  editProfileDescriptionInput,
  addNewCardCardNameInput,
  addNewCardUrlInput,
  hidePopup,
} from "./popups";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
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
