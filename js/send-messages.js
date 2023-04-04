import { isEscapeKey } from './utils.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let errorMessageElement;
let successMessageElement;

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    if (successMessageElement) {
      closeSuccessMessage();
      return;
    }
  }
  closeErrorMessage();
};

const onErrorMessageClick = () => closeErrorMessage();
const onSuccessMessageClick = () => closeSuccessMessage();

const onErrorClick = (evt) => {
  if(!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
};

const onSuccessClick = (evt) => {
  if(!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const showErrorMessage = () => {
  errorMessageElement = errorTemplate.cloneNode(true);
  document.body.append(errorMessageElement);
  errorMessageElement.querySelector('.error__button').addEventListener('click', onErrorMessageClick);
  errorMessageElement.addEventListener('click', onErrorClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

const showSuccessMessage = () => {
  successMessageElement = successTemplate.cloneNode(true);
  document.body.append(successMessageElement);
  successMessageElement.querySelector('.success__button').addEventListener('click', onSuccessMessageClick);
  successMessageElement.addEventListener('click', onSuccessClick);
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

export {showErrorMessage, showSuccessMessage};

