const placesList = document.querySelector('.places__list');
// Темплейт карточки
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

// Вывести карточки на страницу
initialCards.forEach( (item) => placesList.append(addCard(item, removeCard)) );
