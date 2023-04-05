import { initEffects, resetEffects } from './effect-overlay.js';
import { initScale, resetScale } from './scale-picture.js';
import { isEscapeKey } from './utils.js';
import { initValidator, validateForm } from './validate-form.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './send-messages.js';

const SEND_URL = 'https://28.javascript.pages.academy/kekstagram';
const BLOCKED_BUTTON_TEXT = 'Публикую...';
const UNBLOCKED_BUTTON_TEXT = 'Опубликовано';

const uploadPicture = document.querySelector('#upload-file');
const pictureEditor = document.querySelector('.img-upload__overlay');
const cancelButton = pictureEditor.querySelector('.cancel');
const hashTagField = pictureEditor.querySelector('.text__hashtags');
const commentField = pictureEditor.querySelector('.text__description');
const pictureForm = document.querySelector('.img-upload__form');
const submitButton = pictureEditor.querySelector('#upload-submit');

const isTextFieldFocused = () =>
  document.activeElement === hashTagField ||
  document.activeElement === commentField;

const onCancelButtonDown = () => closePictureEditor();

const onPopupEscKeyDown = (evt) => {
  if(isEscapeKey(evt) && !isTextFieldFocused() && !document.querySelector('.error')) {
    evt.preventDefault();
    closePictureEditor();
  }
};

const changeButtonState = (state, content) => {
  submitButton.disabled = state;
  submitButton.textContent = content;
};

const onSendSuccess = () => {
  closePictureEditor();
  showSuccessMessage();
  changeButtonState(false, UNBLOCKED_BUTTON_TEXT);
};

const onSendFail = () => {
  showErrorMessage();
  changeButtonState(false, UNBLOCKED_BUTTON_TEXT);
};

const onPictureFormSubmit = (evt) => {
  evt.preventDefault();
  if(validateForm()) {
    changeButtonState(true, BLOCKED_BUTTON_TEXT);
    sendData(SEND_URL, onSendSuccess, onSendFail, new FormData(evt.target));
  }
};

const openPictureEditor = () => {
  pictureEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCancelButtonDown);
  document.addEventListener('keydown', onPopupEscKeyDown);
};

function closePictureEditor () {
  pictureForm.reset();
  resetScale();
  resetEffects();
  pictureEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', onCancelButtonDown);
  document.removeEventListener('keydown', onPopupEscKeyDown);
}

const initPictureEditor = () => {
  initValidator();
  initScale();
  initEffects();
  uploadPicture.addEventListener('change', openPictureEditor);
  pictureForm.addEventListener('submit', onPictureFormSubmit);
};

export { initPictureEditor };
