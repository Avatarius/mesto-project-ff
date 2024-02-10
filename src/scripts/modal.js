const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.openedPopup = popup;
  document.addEventListener("mousedown", closeModalWithMouse);
  document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("mousedown", closeModalWithMouse);
  document.removeEventListener("keydown", closeModalWithEsc);
}

function closeModalWithMouse(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  }
}

function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(evt.currentTarget.openedPopup);
  }
}

function clearAddNewCardForm(popupObj) {
  popupObj.inputName.value = "";
  popupObj.inputDetails.value = "";
}

function setProfileForm(popupObj) {
  popupObj.inputName.value = profileTitle.textContent;
  popupObj.inputDetails.value = profileDescription.textContent;
}

function setProfile(popupObj) {
  profileTitle.textContent = popupObj.inputName.value;
  profileDescription.textContent = popupObj.inputDetails.value;
}

function setCardImage(img, popupObj) {
  popupObj.img.src = img.src;
  popupObj.img.alt = img.alt;
  popupObj.caption.textContent = img.alt;
}

export {
  openModal,
  closeModal,
  clearAddNewCardForm,
  setProfileForm,
  setProfile,
  setCardImage,
};
