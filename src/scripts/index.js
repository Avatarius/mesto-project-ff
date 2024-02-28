import "../pages/index.css";
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

// список с карточками
const placesList = document.querySelector(".places__list");
// Данные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
// кнопки открытия попапов
const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

// функция для генерации объектов со всеми нужными элементами попапа
function constructPopupObj(popupClass) {
  const popup = document.querySelector(popupClass);
  return {
    popup,
    form: popup.querySelector(".popup__form"),
    inputList: popup.querySelectorAll(".popup__input"),
    button: popup.querySelector(".popup__button"),
    img: popup.querySelector(".popup__image"),
    caption: popup.querySelector(".popup__caption"),
  };
}

// попап объекты
const addNewCardPopupObj = constructPopupObj(".popup_type_new-card");
const editProfilePopupObj = constructPopupObj(".popup_type_edit");
const editProfileAvatarPopupObj = constructPopupObj(".popup_type_avatar-edit");
const removeCardPopupObj = constructPopupObj(".popup_type_remove-card");
const imagePopupObj = constructPopupObj(".popup_type_image");
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
// Объект с функциями
const funcObj = {
  removeFunc: function (evt, id) {
    handleCardRemoveSubmit = function (event) {
      event.preventDefault();
      removeCardApi(id)
        .then(() => {
          removeCard(evt);
          closeModal(removeCardPopupObj.popup);
          setTimeout(
            () =>
              renderLoading(
                false,
                removeCardPopupObj.button,
                "Да",
                "Идёт удаление"
              ),
            600
          );
        })
        .catch((err) => console.log(`Не удалось удалить карточку. ${err}`))

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

// берём данные профиля и карточки и добавляем на страницу
let myId;
Promise.all([getProfileInfoApi(), getCardListApi()])
  .then((resList) => {
    // обновляем профиль
    const [profileInfo, cardList] = resList;
    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileAvatar.style.backgroundImage = `url(${profileInfo.avatar})`;
    myId = profileInfo._id;
    // показываем карточки
    cardList.forEach((card) => {
      card.myId = myId;
      placesList.append(addCard(card, funcObj));
    });
  })
  .catch((err) => {
    console.log(`Не удалось загрузить данные. ${err}`);
  });

// во время загрузки меняем текст кнопки
function renderLoading(
  isLoading,
  btn,
  defaultText = "Сохранить",
  newText = "Сохранение..."
) {
  const buttonText = isLoading ? newText : defaultText;
  btn.textContent = buttonText;
}
// обработчики submit
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editProfilePopupObj.button);

  const name = editProfilePopupObj.inputList[0].value;
  const about = editProfilePopupObj.inputList[1].value;
  setProfileInfoApi(name, about)
    .then(() => {
      profileTitle.textContent = name;
      profileDescription.textContent = about;
    })
    .catch((err) => console.log(`Не удалось изменить профиль. ${err}`))
    .finally(() => {
      closeModal(editProfilePopupObj.popup);
      setTimeout(() => renderLoading(false, editProfilePopupObj.button), 600);
    });
}
// добавляем новую карточку
function handleAddCardFormSubmit(evt) {
  // отрефакторить
  evt.preventDefault();
  renderLoading(true, addNewCardPopupObj.button);
  const name = addNewCardPopupObj.inputList[0].value;
  const link = addNewCardPopupObj.inputList[1].value;
  addCardApi(name, link)
    .then((res) => {
      res.name = name;
      res.link = link;
      res.myId = myId;
      placesList.prepend(addCard(res, funcObj));
    })
    .catch((err) => console.log(`Не удалось добавить карточку. ${err}`))
    .finally(() => {
      closeModal(addNewCardPopupObj.popup);
      setTimeout(() => renderLoading(false, addNewCardPopupObj.button), 600);
    });
}
// фунция для удаления карточки, заменяется в funcObj
let handleCardRemoveSubmit = function (evt) {
  evt.preventDefault();
};
// меняем аватарку
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

// обработчик клика по картинке карточки
function handleCardImgClick(evt) {
  imagePopupObj.img.src = evt.target.src;
  imagePopupObj.img.alt = evt.target.alt;
  imagePopupObj.caption.textContent = evt.target.alt;
  openModal(imagePopupObj.popup);
}

// открытие попапов
addCardButton.addEventListener("click", function () {
  addNewCardPopupObj.form.reset();
  clearValidation(addNewCardPopupObj.form, validationObj);
  openModal(addNewCardPopupObj.popup);
});
profileEditButton.addEventListener("click", function () {
  clearValidation(editProfilePopupObj.form, validationObj);
  editProfilePopupObj.inputList[0].value = profileTitle.textContent;
  editProfilePopupObj.inputList[1].value = profileDescription.textContent;
  openModal(editProfilePopupObj.popup);
});
profileAvatar.addEventListener("click", function () {
  editProfileAvatarPopupObj.form.reset();
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
removeCardPopupObj.form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, removeCardPopupObj.button, "Да", "Идёт удаление");
  handleCardRemoveSubmit(evt);
});

// валидация инпутов
enableValidation(validationObj);
