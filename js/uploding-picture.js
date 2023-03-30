import { initEffects, resetEffects } from './effect-overlay.js';
import { initScale, resetScale } from './scale-picture.js';
import { isEscapeKey } from './utils.js';
import { initValidator, resetValidator } from './validate-form.js';

const uploadPicture = document.querySelector('#upload-file');
const pictureEditor = document.querySelector('.img-upload__overlay');

const cancelButton = pictureEditor.querySelector('.cancel');

const hashTagField = pictureEditor.querySelector('.text__hashtags');
const commentField = pictureEditor.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashTagField ||
  document.activeElement === commentField;

const cancelButtonDownHandler = () => {
  closePictureEditor();
};

const popupEscKeyDownHandler = (evt) => {
  if(isEscapeKey(evt) && !isTextFieldFocused()) {
    closePictureEditor();
  }
};

const openPictureEditor = () => {
  initValidator();
  initScale();
  initEffects();
  pictureEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancelButton.addEventListener('click', cancelButtonDownHandler);
  document.addEventListener('keydown', popupEscKeyDownHandler);
};

function closePictureEditor () {
  resetValidator();
  resetScale();
  resetEffects();
  pictureEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  cancelButton.removeEventListener('click', cancelButtonDownHandler);
  document.removeEventListener('keydown', popupEscKeyDownHandler);
}

const initPictureEditor = () => uploadPicture.addEventListener('change', openPictureEditor);

export { initPictureEditor };
