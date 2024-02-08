import '../pages/index.css';
import { initialCards } from './cards';
import { addNewCardPopup, editProfilePopup, imagePopup, showAddNewCardPopup, showEditProfilePopup } from './popups';
import { handleAddCardFormSubmit, handleEditProfileFormSubmit } from './forms';

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

const addCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const addNewCardForm = addNewCardPopup.querySelector('.popup__form');
const editProfileForm = editProfilePopup.querySelector('.popup__form');


// Функция создания карточки
function addCard(cardObj, removeFunc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  let {name, link} = cardObj;

  const title = cardElement.querySelector('.card__title');
  const img = cardElement.querySelector('.card__image');
  const removeBtn = cardElement.querySelector('.card__delete-button');

  title.textContent = name;
  img.alt = name;
  img.src = link;
  removeBtn.addEventListener('click', (event) => removeFunc(event.target));
  return cardElement;
}

// Функция удаления карточки
function removeCard(target) {
  target.closest('.card').remove();
}

// Вывести карточки на страницу
initialCards.forEach( (item) => placesList.append(addCard(item, removeCard)) );



addCardButton.addEventListener('click', showAddNewCardPopup );
profileEditButton.addEventListener('click', showEditProfilePopup );

addNewCardForm.addEventListener('submit', handleAddCardFormSubmit );
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit );



