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
  getLikesApi,
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

// классы для генерации объектов со всеми нужными элементами попапа
class Popup {
  constructor(popupClass) {
    this.popup = document.querySelector(popupClass);
  }
}
class FormPopup extends Popup {
  constructor(popupClass) {
    super(popupClass);
    this.form = this.popup.querySelector(".popup__form");
    this.button = this.popup.querySelector(".popup__button");
  }
}
class ImgPopup extends Popup {
  constructor(popupClass) {
    super(popupClass);
    this.img = this.popup.querySelector(".popup__image");
    this.caption = this.popup.querySelector(".popup__caption");
  }
}

// попап объекты
const addNewCardPopupObj = new FormPopup(".popup_type_new-card");
const editProfilePopupObj = new FormPopup(".popup_type_edit");
const editProfileAvatarPopupObj = new FormPopup(".popup_type_avatar-edit");
const removeCardPopupObj = new FormPopup(".popup_type_remove-card");
const imagePopupObj = new ImgPopup(".popup_type_image");
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
        .catch((err) => console.log(`Не удалось удалить карточку. ${err}`));
    };
    openModal(removeCardPopupObj.popup);
  },
  likeFunc: function (evt, id) {
    // находим карточку и выясняем лайкали ли мы её
    getCardListApi()
      .then((cardList) => {
        let card;
        cardList.forEach((item) => {
          if (item._id === id) {
            card = item;
          }
        });
        return card.likes.some((item) => item._id === myId);
      })
      // ставим или убираем лайк
      .then((isAlreadyLiked) => {
        likeCardApi(id, isAlreadyLiked)
          .then((res) => {
            likeCard(evt);
            updateLikeCounter(evt.target, res.likes.length);
          })
          .catch((err) => console.log(`Не удалось поставить лайк. ${err}`));
      });
    // ставим или удаляем лайк
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
      setTimeout(() => renderLoading(false, editProfilePopupObj.button), 600);
    })
    .catch((err) => console.log(`Не удалось изменить профиль. ${err}`));
}
// добавляем новую карточку
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, addNewCardPopupObj.button);
  const name = addNewCardPopupObj.form.place - name.value;
  const link = addNewCardPopupObj.form.place - link.value;
  addCardApi(name, link)
    .then((res) => {
      res.myId = myId;
      placesList.prepend(addCard(res, funcObj));
      closeModal(addNewCardPopupObj.popup);
      setTimeout(() => renderLoading(false, addNewCardPopupObj.button), 600);
    })
    .catch((err) => console.log(`Не удалось добавить карточку. ${err}`));
}
// фунция для удаления карточки, заменяется в funcObj
let handleCardRemoveSubmit = function (evt) {
  evt.preventDefault();
};
// меняем аватарку
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editProfileAvatarPopupObj.button);
  const url = editProfileAvatarPopupObj.form.avatar - link.value;

  setProfileAvatar(url)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closeModal(editProfileAvatarPopupObj.popup);
      setTimeout(
        () => renderLoading(false, editProfileAvatarPopupObj.button),
        600
      );
    })
    .catch((err) => console.log(`Не удалось загрузить аватар. ${err}`));
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
