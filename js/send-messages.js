import { isEscapeKey } from './utils.js';
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let errorMessageElement;
let successMessageElement;

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
  }
  if (evt.target.closest(successMessageElement)) {
    closeSuccessMessage();
  }
  closeErrorMessage();
};

const onErrorMessageClick = () => closeErrorMessage();
const onSuccessMessageClick = () => closeSuccessMessage();


const showErrorMessage = () => {
  errorMessageElement = errorTemplate.cloneNode(true);
  document.body.append(errorMessageElement);
  errorMessageElement.querySelector('.error__button').addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

const showSuccessMessage = () => {
  successMessageElement = successTemplate.cloneNode(true);
  document.body.append(successMessageElement);
  successMessageElement.querySelector('.success__button').addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

function closeErrorMessage () {
  errorMessageElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
}

function closeSuccessMessage () {
  successMessageElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const showFatalErrorMessage = () => {
  const fatalErrorMessageElement = errorTemplate.cloneNode(true);
  fatalErrorMessageElement.querySelector('.error__title').textContent = 'Ошибка загрузки данных с сервера';
  fatalErrorMessageElement.querySelector('.error__button').remove();
  return fatalErrorMessageElement;
};


export {showErrorMessage, showSuccessMessage, showFatalErrorMessage};

