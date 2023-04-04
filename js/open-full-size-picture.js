import { isEscapeKey } from './utils.js';

const COMMENTS_FOR_LOADER = 5;

const fullSizePicture = document.querySelector('.big-picture');
const imgElement = fullSizePicture.querySelector('.big-picture__img img');
const likesElement = fullSizePicture.querySelector('.likes-count');
const commentsCountElement = fullSizePicture.querySelector('.comments-count');
const descriptionElement = fullSizePicture.querySelector('.social__caption');
const cancelButton = fullSizePicture.querySelector('#picture-cancel');
const commentsLoader = fullSizePicture.querySelector('.comments-loader');
const socialCommentsCount = fullSizePicture.querySelector('.social__comment-count');
const commentsList = fullSizePicture.querySelector('.social__comments');
const commentsItem = fullSizePicture.querySelector('.social__comment');

let totalNumberOfComments = 0;
let comments = [];

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt) && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeFullSizePicture();
  }
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeFullSizePicture();
};

const createComment = (comment) => {
  const commentTemplate = commentsItem.cloneNode(true);
  const img = commentTemplate.querySelector('img');
  img.src = comment.avatar;
  img.alt = comment.name;
  commentTemplate.querySelector('.social__text').textContent = comment.message;
  return commentTemplate;
};

const changeButtonState = () => {
  if (totalNumberOfComments >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const uploadSocialCommentsCount = () => {
  socialCommentsCount.innerHTML = `
    ${totalNumberOfComments} из <span class="comments-count">${comments.length}</span> комментариев
  `;
};

const renderComments = () => {
  const currentComments = comments.slice(totalNumberOfComments, totalNumberOfComments + COMMENTS_FOR_LOADER);
  totalNumberOfComments += COMMENTS_FOR_LOADER;
  totalNumberOfComments = Math.min(totalNumberOfComments, comments.length);
  currentComments.forEach((comment) => commentsList.append(createComment(comment)));
  changeButtonState();
  uploadSocialCommentsCount();
};

const fillBigPicture = (data) => {
  const {url, alt, likes, description} = data;
  imgElement.src = url;
  imgElement.alt = alt;
  likesElement.textContent = likes;
  commentsCountElement.textContent = data.comments.length;
  descriptionElement.textContent = description;
};

function closeFullSizePicture () {
  fullSizePicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  commentsLoader.removeEventListener('click', renderComments);
  totalNumberOfComments = 0;
}

const openFullSizePicture = (data) => {
  commentsList.innerHTML = '';
  comments = data.comments;
  fullSizePicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  fillBigPicture(data);
  renderComments();
  commentsLoader.addEventListener('click', renderComments);
};

export {openFullSizePicture};
