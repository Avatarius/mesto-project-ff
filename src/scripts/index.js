import '../pages/index.css';
import { displayInitialCards, placesList } from './cards';
import { addNewCardPopup, editProfilePopup, imagePopup, showAddNewCardPopup, showEditProfilePopup, showImagePopup } from './popups';
import { handleAddCardFormSubmit, handleEditProfileFormSubmit } from './forms';

displayInitialCards();

const addCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const addNewCardForm = addNewCardPopup.querySelector('.popup__form');
const editProfileForm = editProfilePopup.querySelector('.popup__form');

addCardButton.addEventListener('click', showAddNewCardPopup);
profileEditButton.addEventListener('click', showEditProfilePopup);

addNewCardForm.addEventListener('submit', handleAddCardFormSubmit);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

placesList.addEventListener('click', showImagePopup);
