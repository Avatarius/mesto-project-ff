import { setProfileFormWhenShown } from "./forms";

const addNewCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const popup_array = [addNewCardPopup, editProfilePopup, imagePopup];

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


function _showPopup(popup) {
  popup.style.display = "flex";
  document.addEventListener("mousedown", _handleHidePopup);
  document.addEventListener("keydown", _handleHidePopup);
}

function hidePopup() {
  popup_array.forEach((item) => {
    item.style.display = "none";
  });
}

function showAddNewCardPopup() {
  _showPopup(addNewCardPopup);
}

function showEditProfilePopup() {
  _showPopup(editProfilePopup);

  setProfileFormWhenShown();
}

function _handleHidePopup(evt) {
  const target = evt.target;
  const hideCondition =
    target.classList.contains("popup__close") || // close button
    target.classList.contains("popup") || // click outside
    evt.key === "Escape"; // escape
  if (hideCondition) {
    hidePopup();
    document.removeEventListener("keydown", _handleHidePopup);
  }
}

export {
  editProfileNameInput,
  editProfileDescriptionInput,
  addNewCardCardNameInput,
  addNewCardUrlInput,
  addNewCardPopup,
  editProfilePopup,
  imagePopup,
  showAddNewCardPopup,
  showEditProfilePopup,
  hidePopup,
};
