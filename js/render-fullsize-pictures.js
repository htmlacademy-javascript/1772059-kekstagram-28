import { isEscapeKey } from './utils.js';

const fullSizePicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const cancelButton = fullSizePicture.querySelector('#picture-cancel');

const imgElement = fullSizePicture.querySelector('.big-picture__img img');
const likesElement = fullSizePicture.querySelector('.likes-count');
const commentsCountElement = fullSizePicture.querySelector('.comments-count');
const descriptionElement = fullSizePicture.querySelector('.social__caption');

const commentsLoader = fullSizePicture.querySelector('.comments-loader');
const socialCommentsCount = fullSizePicture.querySelector('.social__comment-count');
const commentsList = fullSizePicture.querySelector('.social__comments');

const COMMENTS_FOR_LOADER = 5;
let totalNumberOfComments = 0;
let commentsContainer = [];

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

  while(commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  onCancelButtonDown();
  onPopupEscKeyDown();
}

function closeFullSizePicture () {
  fullSizePicture.classList.add('hidden');
  body.classList.remove('modal-open');

  cancelButton.removeEventListener('click', onCancelButtonDown);
  document.removeEventListener('keydown', popupEscKeyDownHandler);
  commentsLoader.removeEventListener('click', loadComments);
  totalNumberOfComments = 0;
}

function createElement (tagName, className, text) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if(text) {
    element.textContent = text;
  }
  return element;
}

function createComment ({avatar, message, name}) {
  const socialComment = createElement('li', 'social__comment');
  const socialPicture = createElement('img', 'social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialComment.appendChild(socialPicture);
  const socialText = createElement('p', 'social__text', message);
  socialComment.appendChild(socialText);

  return socialComment;
}

function loadComments (comments) {

  totalNumberOfComments += COMMENTS_FOR_LOADER;
  if(totalNumberOfComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    totalNumberOfComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentFragment = document.createDocumentFragment();
  for(let i = 0; i < totalNumberOfComments; i++) {
    const commentElement = createComment(comments[i]);
    commentFragment.append(commentElement);
  }

  commentsList.innerHTML = '';
  commentsList.append(commentFragment);
  socialCommentsCount.innerHTML = `
    ${totalNumberOfComments} из <span class="comments-count">${commentsContainer.length}</span> комментариев
  `;
}


function onCommentsLoader (comments) {
  commentsLoader.addEventListener('click', () => loadComments(comments));
}

function renderFullSizePicture (userPost) {
  const {url, comments, alt, likes, description} = userPost;
  openFullSizePicture();

  imgElement.src = url;
  imgElement.alt = alt;
  likesElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  descriptionElement.textContent = description;
  commentsContainer = comments;

  loadComments(commentsContainer);
  onCommentsLoader(commentsContainer);

  onPopupEscKeyDown();
  onCancelButtonDown();
}

export {renderFullSizePicture};


