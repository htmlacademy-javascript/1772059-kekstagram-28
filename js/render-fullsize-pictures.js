import { isEscapeKey } from './utils.js';

const fullSizePicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialCommentsCount = fullSizePicture.querySelector('.social__comment-count');
const commentsLoader = fullSizePicture.querySelector('.comments-loader');
const cancelButton = fullSizePicture.querySelector('#picture-cancel');

// переименовать переменные, добавить element-
const imgElement = fullSizePicture.querySelector('.big-picture__img img');
const likesElement = fullSizePicture.querySelector('.likes-count');
const commentsCountElement = fullSizePicture.querySelector('.comments-count');
const descriptionElement = fullSizePicture.querySelector('.social__caption');


function popupEscKeyDownHandler (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    fullSizePicture.classList.add('hidden');
    body.classList.remove('modal-open');
    closeFullSizePicture();
  }
}

function onPopupEscKeyDown () {
  document.addEventListener('keydown', popupEscKeyDownHandler);
}

function cancelButtonDownHandler () {
  fullSizePicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeFullSizePicture();
}

function onCancelButtonDown () {
  cancelButton.addEventListener('click', cancelButtonDownHandler);
}

function openFullSizePicture() {
  fullSizePicture.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentsCount.classList.add('hidden'); //delete
  commentsLoader.classList.add('hidden'); // delete

  onCancelButtonDown();
  onPopupEscKeyDown();
}

function closeFullSizePicture () {
  fullSizePicture.classList.add('hidden');
  body.classList.remove('modal-open');

  cancelButton.removeEventListener('click', onCancelButtonDown);
  document.removeEventListener('keydown', popupEscKeyDownHandler);
}

function renderFullSizePicture (userPost) {
  const {url, comments, alt, likes, description} = userPost;
  openFullSizePicture();

  imgElement.src = url;
  imgElement.alt = alt;
  likesElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  descriptionElement.textContent = description;
  onPopupEscKeyDown();
  onCancelButtonDown();
}

export {renderFullSizePicture};


