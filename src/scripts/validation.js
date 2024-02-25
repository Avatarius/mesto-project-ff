function enableValidation(settingsObj) {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
    const buttonElement = formElement.querySelector(settingsObj.submitButtonSelector);
    setEventListeners(formElement, inputList, buttonElement, settingsObj.inactiveButtonClass, settingsObj.inputErrorClass, settingsObj.errorClass);
  });
}

function clearValidation() {}

function setEventListeners(formElement, inputList, buttonElement, inactiveButtonClass, inputErrorClass, errorClass) {
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(inputElement.dataset.valueMissingError);
  } else {
    inputElement.setCustomValidity("");
  }

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternMismatchError);
  } else {
    inputElement.setCustomValidity("");
  }
  // основная проверка на валиднодсть
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideInputError(errorElement, inputElement, inputErrorClass, errorClass);
  }
}

function showInputError(errorElement, inputElement, inputErrorClass, errorClass) {
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(errorElement, inputElement, inputErrorClass, errorClass) {
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonSelector) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonSelector);
  } else {
    buttonElement.classList.remove(inactiveButtonSelector);
  }
}

export { enableValidation, clearValidation };
