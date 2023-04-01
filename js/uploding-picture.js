import { initEffects, resetEffects } from './effect-overlay.js';
import { initScale, resetScale } from './scale-picture.js';
import { isEscapeKey } from './utils.js';
import { initValidator, validateForm } from './validate-form.js';

const uploadPicture = document.querySelector('#upload-file');
const pictureEditor = document.querySelector('.img-upload__overlay');
const cancelButton = pictureEditor.querySelector('.cancel');
const hashTagField = pictureEditor.querySelector('.text__hashtags');
const commentField = pictureEditor.querySelector('.text__description');
const pictureForm = document.querySelector('.img-upload__form');

const isTextFieldFocused = () =>
  document.activeElement === hashTagField ||
  document.activeElement === commentField;

const onCancelButtonDown = () => closePictureEditor();

const onPopupEscKeyDown = (evt) => {
  if(isEscapeKey(evt) && !isTextFieldFocused()) {
    closePictureEditor();
  }
};

const onPictureFormSubmit = (evt) => {
  evt.preventDefault();
  if(validateForm()) {
    console.log('Форма отправлена успешно');
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
