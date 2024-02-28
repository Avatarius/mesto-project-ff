import "../pages/index.css";
// import { initialCards } from "./cards";
import { addCard, removeCard, likeCard, updateLikeCounter } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getProfileInfoApi,
  setProfileInfoApi,
  getCardListApi,
  addCardApi,
  removeCardApi,
  likeCardApi,
  setProfileAvatar,
} from "./api";

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
const editProfileAvatarPopupObj = constructAddOrEditPopupObj(
  ".popup_type_avatar-edit"
);
const removeCardPopupObj = constructAddOrEditPopupObj(
  ".popup_type_remove-card"
);
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
const profileAvatar = document.querySelector(".profile__image");

// кнопки открытия попапов
const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

// берём данные профиля и карточки и добавляем на страницу
let myId;
Promise.all([getProfileInfoApi(), getCardListApi()])
  .then((resList) => {
    const [profileInfo, cardList] = resList;
    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileAvatar.style.backgroundImage = `url(${profileInfo.avatar})`;
    myId = profileInfo._id;

    cardList.forEach((card) => {
      card.myId = myId;
      placesList.append(addCard(card, funcObj));
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Объект с функциями
const funcObj = {
  removeFunc: function (evt, id) {
    handleCardRemoveSubmit = function (event) {
      event.preventDefault();
      removeCardApi(id)
        .then(() => {
          removeCard(evt);
        })
        .catch((err) => console.log(err))
        .finally(() => closeModal(removeCardPopupObj.popup));
    };
    openModal(removeCardPopupObj.popup);
  },
  likeFunc: function (evt, id) {
    const isAlreadyLiked = evt.target.classList.contains(
      "card__like-button_is-active"
    );
    likeCardApi(id, isAlreadyLiked)
      .then((res) => {
        likeCard(evt);
        updateLikeCounter(evt.target.nextElementSibling, res.likes.length);
      })
      .catch((err) => console.log(`Не удалось поставить лайк. ${err}`));
  },
  imgClickFunc: handleCardImgClick,
};

// очистка формы добавления карточки при открытии попапа
function clearForm(popupObj) {
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

// во время загрузки меняем текст кнопки
function renderLoading(isLoading, btn) {
  const buttonText = isLoading ? "Сохранение..." : "Сохранить";
  btn.textContent = buttonText;
}
// обработчики submit
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editProfilePopupObj.button);

  setProfileInfoApi({
    name: editProfilePopupObj.inputList[0].value,
    about: editProfilePopupObj.inputList[1].value,
  })
    .then(() => {
      setProfile(editProfilePopupObj);
    })
    .catch((err) => console.log(`Не удалось изменить профиль. ${err}`))
    .finally(() => {
      closeModal(editProfilePopupObj.popup);
      setTimeout(() => renderLoading(false, editProfilePopupObj.button), 600);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, addNewCardPopupObj.button);
  const newCardObj = {
    name: addNewCardPopupObj.inputList[0].value,
    link: addNewCardPopupObj.inputList[1].value,
    likes: [],
  };
  addCardApi(newCardObj)
    .then((res) => {
      res.name = newCardObj.name;
      res.link = newCardObj.link;
      res.myId = myId;
      placesList.prepend(addCard(res, funcObj));
    })
    .catch((err) => console.log(`Не удалось добавить карточку. ${err}`))
    .finally(() => {
      closeModal(addNewCardPopupObj.popup);
      setTimeout(() => renderLoading(false, addNewCardPopupObj.button), 600);
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editProfileAvatarPopupObj.button);
  const url = editProfileAvatarPopupObj.inputList[0].value;

  setProfileAvatar(url)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => console.log(`Не удалось загрузить аватар. ${err}`))
    .finally(() => {
      closeModal(editProfileAvatarPopupObj.popup);
      setTimeout(
        () => renderLoading(false, editProfileAvatarPopupObj.button),
        600
      );
    });
}

let handleCardRemoveSubmit = function (evt) {
  evt.preventDefault();
};

// обработчик клика по картинке карточки
function handleCardImgClick(evt) {
  setCardImage(imagePopupObj, evt.target);
  openModal(imagePopupObj.popup);
}

// открытие попапов
addCardButton.addEventListener("click", function () {
  clearForm(addNewCardPopupObj);
  clearValidation(addNewCardPopupObj.form, validationObj);
  openModal(addNewCardPopupObj.popup);
});
profileEditButton.addEventListener("click", function () {
  clearValidation(editProfilePopupObj.form, validationObj);
  setProfileForm(editProfilePopupObj);
  openModal(editProfilePopupObj.popup);
});
profileAvatar.addEventListener("click", function () {
  clearForm(editProfileAvatarPopupObj);
  openModal(editProfileAvatarPopupObj.popup);
});

// submit
addNewCardPopupObj.form.addEventListener("submit", handleAddCardFormSubmit);
editProfilePopupObj.form.addEventListener(
  "submit",
  handleEditProfileFormSubmit
);
editProfileAvatarPopupObj.form.addEventListener(
  "submit",
  handleEditAvatarFormSubmit
);
removeCardPopupObj.form.addEventListener("submit", (evt) =>
  handleCardRemoveSubmit(evt)
);

// валидация инпутов
enableValidation(validationObj);
