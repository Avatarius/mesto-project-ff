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

export {
  openModal,
  closeModal,
};
