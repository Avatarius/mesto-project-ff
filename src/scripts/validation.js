function enableValidation(settingsObj) {
  const formList = Array.from(
    document.querySelectorAll(settingsObj.formSelector)
  );

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(settingsObj.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settingsObj.submitButtonSelector
    );
    setEventListeners(formElement, inputList, buttonElement, settingsObj);
  });
}

function clearValidation(formElement, settingsObj) {
  const errorList = Array.from(
    formElement.querySelectorAll(settingsObj.errorSelector)
  );
  const inputList = Array.from(
    formElement.querySelectorAll(settingsObj.inputSelector)
  );
  const button = formElement.querySelector(settingsObj.submitButtonSelector);
  inputList.forEach((inputElement, index) => {
    hideInputError(
      errorList[index],
      inputElement,
      settingsObj.inputErrorClass,
      settingsObj.errorActiveClass
    );
    setCustomValidity(inputElement, "");
  });
  toggleButtonState(inputList, button, settingsObj.inactiveButtonClass);
}

function setEventListeners(formElement, inputList, buttonElement, settingsObj) {
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

function setCustomValidity(inputElement, errorMessage) {
  inputElement.setCustomValidity(errorMessage);
}

function checkInputValidity(formElement, inputElement, settingsObj) {
  if (inputElement.validity.valueMissing) {
    setCustomValidity(inputElement, inputElement.dataset.valueMissingError);
  } else {
    setCustomValidity(inputElement, "");
  }

  if (inputElement.validity.patternMismatch) {
    setCustomValidity(inputElement, inputElement.dataset.patternMismatchError);
  } else {
    setCustomValidity(inputElement, "");
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
