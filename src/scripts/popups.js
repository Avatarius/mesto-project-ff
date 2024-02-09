import { setProfileFormWhenShown, clearAddCardForm } from "./forms";

const addNewCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const popup_array = [addNewCardPopup, editProfilePopup, imagePopup];

popup_array.forEach( (item) => item.classList.toggle("popup_is-animated") );

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

  setTimeout(() => popup.classList.add("popup_is-opened"), 100);

  document.addEventListener("mousedown", _handleHidePopup);
  document.addEventListener("keydown", _handleHidePopup);
}

function hidePopup() {
  popup_array.forEach((item) => {
    setTimeout(() => item.classList.remove("popup_is-opened"), 100);
    // item.classList.toggle("popup_is-animated");
  });
}

function showAddNewCardPopup() {
  _showPopup(addNewCardPopup);
  clearAddCardForm();
}

function showEditProfilePopup() {
  _showPopup(editProfilePopup);
  setProfileFormWhenShown();
}

function showImagePopup(evt) {
  const target = evt.target;
  if (target.classList.contains('card__image')) {
    const img = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');
    img.src = target.src;
    img.alt = target.alt;
    caption.textContent = target.alt;
    _showPopup(imagePopup);
  }

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
  showImagePopup,
  hidePopup,
};
