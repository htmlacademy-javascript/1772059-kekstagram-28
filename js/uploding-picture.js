import { resetEffects } from './effect-overlay.js';
import { resetScale } from './scale-picture.js';
import { isEscapeKey } from './utils.js';
import './validate-form.js';
import './effect-overlay.js';

const uploadPicture = document.querySelector('#upload-file');
const pictureEditor = document.querySelector('.img-upload__overlay');

const cancelButton = pictureEditor.querySelector('.cancel');

const hashTagField = pictureEditor.querySelector('.text__hashtags');
const commentField = pictureEditor.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashTagField ||
  document.activeElement === commentField;

function cancelButtonDownHandler() {
  closePictureEditor();
}

function popupEscKeyDownHandler(evt) {
  if(isEscapeKey(evt) && !isTextFieldFocused()) {
    closePictureEditor();
  }
}

function openPictureEditor() {
  pictureEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancelButton.addEventListener('click', cancelButtonDownHandler);
  document.addEventListener('keydown', popupEscKeyDownHandler);
}

function closePictureEditor() {

  resetScale();
  resetEffects();

  pictureEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  cancelButton.removeEventListener('click', cancelButtonDownHandler);
  document.removeEventListener('keydown', popupEscKeyDownHandler);
}

uploadPicture.addEventListener('change', openPictureEditor);

