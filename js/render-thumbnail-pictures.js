import { openFullSizePicture } from './open-full-size-picture.js';
import { getPhotoGallery } from './data.js';

const picturesGrid = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoData = getPhotoGallery();

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

const renderThumbnails = () => photoData.forEach((item) => picturesGrid.append(createThumbnail(item)));

export { renderThumbnails };
