
export function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); //('.popup__form')
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); //'.popup__input'
    const buttonElement = formElement.querySelector(config.submitButtonSelector); //'.popup__button'
    toggleButtonState(config, inputList, buttonElement); // здесь функция должна не дать быть кнопке активной при открытии попапа и при пустых инпутах
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        isValidInput(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
      })
    })
  })
} //функция ищет все формы на странице, ищет все инпуты в форме и добавляет каждому инпуту обработчик

export function clearValidation(config, formElement, shouldClearInputValues) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); //'.popup__input'
  const buttonElement = formElement.querySelector(config.submitButtonSelector); //'.popup__button'
  inputList.forEach((inputElement) => {
    hideInputError(config, formElement, inputElement);
    if(shouldClearInputValues) {
      inputElement.value = '';
    }
  })
  toggleButtonState(config, inputList, buttonElement); // здесь функция должна не дать быть кнопке активной при открытии попапа и при пустых инпутах
}

function toggleButtonState(config, inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass); //('popup__button_disabled')
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass); //('popup__button_disabled')
  }
} //функция запускает функцию hasInvalidInput и делает кнопку активной или неактивной


function showInputError(config, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass); //'popup__input_type_error'
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass); // ('popup__input-error-visible')
} //показывает красную обводку и текст ошибки

function hideInputError(config, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass); // 'popup__input_type_error'
  errorElement.classList.remove(config.errorClass); // ('popup__input-error-visible')
  errorElement.textContent = '';
} //убирает красную обводку и текст ошибки

function isValidInput(config, formElement, inputElement) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if(!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement)
  }
} //проверяет инпут на валидность чтобы добавить или убрать красную обводку и текст ошибки

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
} //функция проверяет массив инпутов и находит хотя бы один невалидный и возвращает true или false