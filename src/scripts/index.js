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

// попап объекты
const addNewCardPopup = document.querySelector(".popup_type_new-card");
const addNewCardPopupObj = {
  popup: addNewCardPopup,
  form: addNewCardPopup.querySelector(".popup__form"),
  button: addNewCardPopup.querySelector(".popup__button"),
};
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfilePopupObj = {
  popup: editProfilePopup,
  form: editProfilePopup.querySelector(".popup__form"),
  button: editProfilePopup.querySelector(".popup__button"),
};
const editProfileAvatarPopup = document.querySelector(
  ".popup_type_avatar-edit"
);
const editProfileAvatarPopupObj = {
  popup: editProfileAvatarPopup,
  form: editProfileAvatarPopup.querySelector(".popup__form"),
  button: editProfileAvatarPopup.querySelector(".popup__button"),
};
const removeCardPopup = document.querySelector(".popup_type_remove-card");
const removeCardPopupObj = {
  popup: removeCardPopup,
  form: removeCardPopup.querySelector(".popup__form"),
  button: removeCardPopup.querySelector(".popup__button"),
};
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupObj = {
  popup: imagePopup,
  img: imagePopup.querySelector(".popup__image"),
  caption: imagePopup.querySelector(".popup__caption"),
};

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
  removeFunc: function (button, id) {
    handleCardRemoveSubmit = function (event) {
      event.preventDefault();
      removeCardApi(id)
        .then(() => {
          removeCard(button);
          closeModal(removeCardPopupObj.popup);
        })
        .catch((err) => console.log(`Не удалось удалить карточку. ${err}`))
        .finally(() =>
          setTimeout(
            () =>
              renderLoading(
                false,
                removeCardPopupObj.button,
                "Да",
                "Идёт удаление"
              ),
            600
          )
        );
    };
    openModal(removeCardPopupObj.popup);
  },
  likeFunc: function (button, id, isAlreadyLiked) {
    likeCardApi(id, isAlreadyLiked)
      .then((res) => {
        likeCard(button, isAlreadyLiked);
        updateLikeCounter(button, res.likes.length);
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

  const name = editProfilePopupObj.form.name.value;
  const about = editProfilePopupObj.form.description.value;
  setProfileInfoApi(name, about)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(editProfilePopupObj.popup);
    })
    .catch((err) => console.log(`Не удалось изменить профиль. ${err}`))
    .finally(() =>
      setTimeout(() => renderLoading(false, editProfilePopupObj.button), 600)
    );
}
// добавляем новую карточку
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, addNewCardPopupObj.button);
  const name = addNewCardPopupObj.form.name.value;
  const link = addNewCardPopupObj.form.link.value;
  addCardApi(name, link)
    .then((res) => {
      res.myId = myId;
      placesList.prepend(addCard(res, funcObj));
      closeModal(addNewCardPopupObj.popup);
    })
    .catch((err) => console.log(`Не удалось добавить карточку. ${err}`))
    .finally(() =>
      setTimeout(() => renderLoading(false, addNewCardPopupObj.button), 600)
    );
}
// фунция для удаления карточки, заменяется в funcObj
let handleCardRemoveSubmit = function (evt) {
  evt.preventDefault();
};
// меняем аватарку
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editProfileAvatarPopupObj.button);
  const url = editProfileAvatarPopupObj.form.link.value;

  setProfileAvatar(url)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closeModal(editProfileAvatarPopupObj.popup);
    })
    .catch((err) => console.log(`Не удалось загрузить аватар. ${err}`))
    .finally(() =>
      setTimeout(
        () => renderLoading(false, editProfileAvatarPopupObj.button),
        600
      )
    );
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
  editProfilePopupObj.form.name.value = profileTitle.textContent;
  editProfilePopupObj.form.description.value = profileDescription.textContent;
  openModal(editProfilePopupObj.popup);
});
profileAvatar.addEventListener("click", function () {
  editProfileAvatarPopupObj.form.reset();
  clearValidation(editProfileAvatarPopupObj.form, validationObj);
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
