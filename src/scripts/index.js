import '../pages/index.css';
import { initialCards, addCard, removeCard, updatePlacesList } from './cards';
import { addNewCardPopup, editProfilePopup, imagePopup, showAddNewCardPopup, showEditProfilePopup } from './popups';
import { handleAddCardFormSubmit, handleEditProfileFormSubmit } from './forms';


const addCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const addNewCardForm = addNewCardPopup.querySelector('.popup__form');
const editProfileForm = editProfilePopup.querySelector('.popup__form');

// Вывести карточки на страницу
// initialCards.forEach( (item) => placesList.append(addCard(item, removeCard)) );

addCardButton.addEventListener('click', showAddNewCardPopup );
profileEditButton.addEventListener('click', showEditProfilePopup );

addNewCardForm.addEventListener('submit', handleAddCardFormSubmit);
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit );

updatePlacesList();
