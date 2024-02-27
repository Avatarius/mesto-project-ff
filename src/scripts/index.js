import "../pages/index.css";
// import { initialCards } from "./cards";
import { addCard, removeCard, likeCard } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import { getProfileInfoApi, setProfileInfoApi, getCardListApi, addCardApi, removeCardApi } from "./api";

// функции для генерации DOM объектов
function constructAddOrEditPopupObj(popupClass) {
  const popup = document.querySelector(popupClass);
  return {
    popup,
    form: popup.querySelector(".popup__form"),
    inputList: popup.querySelectorAll(".popup__input"),
    button: popup.querySelector(".popup__button"),
  };
}

function constructImagePopupObj(popupClass) {
  const popup = document.querySelector(popupClass);
  return {
    popup,
    img: popup.querySelector(".popup__image"),
    caption: popup.querySelector(".popup__caption"),
  };
}
// DOM объекты
const addNewCardPopupObj = constructAddOrEditPopupObj(".popup_type_new-card");
const editProfilePopupObj = constructAddOrEditPopupObj(".popup_type_edit");
const imagePopupObj = constructImagePopupObj(".popup_type_image");
// объект с настройками для валидации
const validationObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  errorSelector: ".popup__input-error",
  inputErrorClass: "popup__input_error",
  errorActiveClass: "popup__input-error_active",
};

// список с карточками
const placesList = document.querySelector(".places__list");

// Данные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// кнопки открытия попапов
const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

// берём данные профиля и карточки и добавляем на страницу
let myId;
Promise.all([getProfileInfoApi(), getCardListApi()])
  .then((resList) => {
    const jsonList = [];
    let errorRes;
    for (const res of resList) {
      if (res.ok) {
        jsonList.push(res.json());
      } else {
        errorRes = res;
        return Promise.reject(`Ошибка ${errorRes.status}`);
      }
    }
    return Promise.all(jsonList);
  })
  .then((resList) => {
    const [profileInfo, cardList] = resList;
    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileImage.style.backgroundImage = `url(${profileInfo.avatar})`;
    myId = profileInfo._id;

    cardList.forEach((card) => {
      card.isRemoveButtonVisible = (card.owner._id === myId);
      placesList.append(addCard(card, funcObj));
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Объект с функциями
const funcObj = {
  removeFunc: function(evt, id) {
    removeCardApi(id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(() => removeCard(evt))
      .catch(err => console.log(err));

  },
  likeFunc: likeCard,
  imgClickFunc: handleCardImgClick,
};

// очистка формы добавления карточки при открытии попапа
function clearAddNewCardForm(popupObj) {
  popupObj.form.reset();
}

// Заполнить форму изменения профиля данными со страницы при открытии попапа
function setProfileForm(popupObj) {
  popupObj.inputList[0].value = profileTitle.textContent;
  popupObj.inputList[1].value = profileDescription.textContent;
}

// Изменение данных профиля при сабмите
function setProfile(popupObj) {
  profileTitle.textContent = popupObj.inputList[0].value;
  profileDescription.textContent = popupObj.inputList[1].value;
}

// задать картинку попапа с картинкой при открытии попапа
function setCardImage(popupObj, img) {
  popupObj.img.src = img.src;
  popupObj.img.alt = img.alt;
  popupObj.caption.textContent = img.alt;
}

// обработчики submit
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  setProfile(editProfilePopupObj);
  setProfileInfoApi({name: editProfilePopupObj.inputList[0].value, about: editProfilePopupObj.inputList[1].value})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .catch(err => console.log(err));
  closeModal(editProfilePopupObj.popup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardObj = {
    name: addNewCardPopupObj.inputList[0].value,
    link: addNewCardPopupObj.inputList[1].value,
    likes: [],
  };
  addCardApi(newCardObj)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
    .then(res => {
      res.name = newCardObj.name;
      res.link = newCardObj.link;
      placesList.prepend(addCard(res, funcObj))
    })
    .catch(err => console.log(err));

  closeModal(addNewCardPopupObj.popup);
}

// обработчик клика по картинке карточки
function handleCardImgClick(evt) {
  setCardImage(imagePopupObj, evt.target);
  openModal(imagePopupObj.popup);
}

// показать дефолтные карточки
// initialCards.forEach((item) => placesList.append(addCard(item, funcObj)));

// открытие попапов
addCardButton.addEventListener("click", function () {
  clearAddNewCardForm(addNewCardPopupObj);
  clearValidation(addNewCardPopupObj.form, validationObj);
  openModal(addNewCardPopupObj.popup);
});
profileEditButton.addEventListener("click", function () {
  clearValidation(editProfilePopupObj.form, validationObj);
  setProfileForm(editProfilePopupObj);
  openModal(editProfilePopupObj.popup);
});

// submit
addNewCardPopupObj.form.addEventListener("submit", handleAddCardFormSubmit);
editProfilePopupObj.form.addEventListener(
  "submit",
  handleEditProfileFormSubmit
);






// валидация инпутов
enableValidation(validationObj);
