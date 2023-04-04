import { openFullSizePicture } from './open-full-size-picture.js';
import { getData } from './api.js';
import { showFatalErrorMessage } from './get-message.js';
import { initFilters } from './filtration.js';


const GET_URL = 'https://28.javascript.pages.academy/kekstagram/data';

const picturesGrid = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (picture) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__img').alt = picture.description;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullSizePicture(picture);
  });
  return thumbnail;
};

const renderThumbnails = (data) => data.forEach((item) => picturesGrid.append(createThumbnail(item)));

const onGetSuccess = (data) => {
  renderThumbnails(data);
  initFilters(data);
};

const onGetFail = () => showFatalErrorMessage();

const getThumbnailsData = () => getData(GET_URL, onGetSuccess, onGetFail);

export { getThumbnailsData, renderThumbnails };
