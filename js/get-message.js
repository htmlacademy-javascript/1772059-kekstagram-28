import { isEscapeKey } from './utils.js';

const ERROR_DELAY = 5000;
const ERROR_MESSAGE = 'Ошибка загрузки данных с сервера';
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let fatalErrorMessageElement;

const closeErrorMessage = () => {
  fatalErrorMessageElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

const onErrorClick = (evt) => {
  if(!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
};

const showFatalErrorMessage = () => {
  fatalErrorMessageElement = errorTemplate.cloneNode(true);
  fatalErrorMessageElement.querySelector('.error__title').textContent = ERROR_MESSAGE;
  fatalErrorMessageElement.querySelector('.error__button').remove();
  document.body.append(fatalErrorMessageElement);
  fatalErrorMessageElement.addEventListener('click', onErrorClick);
  document.addEventListener('keydown', onDocumentKeyDown);

  setTimeout(() => {
    fatalErrorMessageElement.remove();
  }, ERROR_DELAY);
  return fatalErrorMessageElement;
};

export { showFatalErrorMessage };
