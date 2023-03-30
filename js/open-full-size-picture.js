import { isEscapeKey } from './utils.js';

const fullSizePicture = document.querySelector('.big-picture');

const imgElement = fullSizePicture.querySelector('.big-picture__img img');
const likesElement = fullSizePicture.querySelector('.likes-count');
const commentsCountElement = fullSizePicture.querySelector('.comments-count');
const descriptionElement = fullSizePicture.querySelector('.social__caption');
const commentsFieldElement = fullSizePicture.querySelector('.social__footer-text');
const cancelButton = fullSizePicture.querySelector('#picture-cancel');
const commentsLoader = fullSizePicture.querySelector('.comments-loader');
const socialCommentsCount = fullSizePicture.querySelector('.social__comment-count');
const commentsList = fullSizePicture.querySelector('.social__comments');
const commentsItem = fullSizePicture.querySelector('.social__comment');

const COMMENTS_FOR_LOADER = 5;
let totalNumberOfComments = 0;
let comments = [];

const isCommentsFieldFocused = () => document.activeElement === commentsFieldElement;

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt) && !isCommentsFieldFocused()) {
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

const checkCommentsCount = () => {
  totalNumberOfComments += COMMENTS_FOR_LOADER;
  if (totalNumberOfComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    totalNumberOfComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const uploadSocialCommentsCount = (currentCount, totalCount) => {
  socialCommentsCount.innerHTML = `
    ${currentCount} из <span class="comments-count">${totalCount.length}</span> комментариев
  `;
};

const renderComments = () => {
  checkCommentsCount();
  commentsList.innerHTML = '';
  for(let i = 0; i < totalNumberOfComments; i++) {
    commentsList.append(createComment(comments[i]));
  }
  uploadSocialCommentsCount(totalNumberOfComments, comments);
};


const fillBigPicture = (data) => {
  const {url, alt, likes, description} = data;
  imgElement.src = url;
  imgElement.alt = alt;
  likesElement.textContent = likes;
  commentsCountElement.textContent = data.comments.length;
  descriptionElement.textContent = description;
};

function closeFullSizePicture () { //не всплывает при объявлении через стрелочную функцию
  fullSizePicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  commentsLoader.addEventListener('click', renderComments);
  totalNumberOfComments = 0;
}

const openFullSizePicture = (data) => {
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
