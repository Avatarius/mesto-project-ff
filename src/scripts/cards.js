const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

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



function updatePlacesList() {
  initialCards.forEach( (item) => placesList.append(addCard(item, removeCard)) );
}


export { initialCards, addCard, removeCard, updatePlacesList };
