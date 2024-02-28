function enableValidation(settingsObj) {
  const formList = Array.from(
    document.querySelectorAll(settingsObj.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, settingsObj);
  });
}

function clearValidation(formElement, settingsObj) {
  const inputList = Array.from(
    formElement.querySelectorAll(settingsObj.inputSelector)
  );
  const button = formElement.querySelector(settingsObj.submitButtonSelector);
  inputList.forEach((inputElement) => {
    console.log(inputElement.validity);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    hideInputError(
      errorElement,
      inputElement,
      settingsObj.inputErrorClass,
      settingsObj.errorActiveClass
    );
    inputElement.setCustomValidity("");
  });
  toggleButtonState(inputList, button, settingsObj.inactiveButtonClass);
}

function setEventListeners(formElement, settingsObj) {
  const inputList = Array.from(
    formElement.querySelectorAll(settingsObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settingsObj.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settingsObj.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settingsObj);
      toggleButtonState(
        inputList,
        buttonElement,
        settingsObj.inactiveButtonClass
      );
    });
  });
}

function checkInputValidity(formElement, inputElement, settingsObj) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternMismatchError);
  } else {
    inputElement.setCustomValidity("");
  }
  // основная проверка на валидность
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(
      errorElement,
      inputElement,
      settingsObj.inputErrorClass,
      settingsObj.errorActiveClass
    );
  } else {
    hideInputError(
      errorElement,
      inputElement,
      settingsObj.inputErrorClass,
      settingsObj.errorActiveClass
    );
  }
}

function showInputError(
  errorElement,
  inputElement,
  inputErrorClass,
  errorActiveClass
) {
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorActiveClass);
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(
  errorElement,
  inputElement,
  inputErrorClass,
  errorActiveClass
) {
  errorElement.textContent = "";
  errorElement.classList.remove(errorActiveClass);
  inputElement.classList.remove(inputErrorClass);
}

function hasInvalidInput(inputList) {
  return (
    inputList.some((inputElement) => !inputElement.validity.valid) ||
    inputList.some((inputElement) => inputElement.value === "")
  );
}

function toggleButtonState(inputList, buttonElement, inactiveButtonSelector) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonSelector);
  } else {
    buttonElement.classList.remove(inactiveButtonSelector);
  }
}

export { enableValidation, clearValidation };
