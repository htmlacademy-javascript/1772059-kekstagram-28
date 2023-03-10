import { createPhotoGallery } from './data.js';

const picturesGrid = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureInfo = pictureTemplate.querySelector('.picture__info');

const similarPictures = createPhotoGallery();
const picturesGridFragment = document.createDocumentFragment();

similarPictures.forEach((picture) => {
  const userPicture = pictureTemplate.cloneNode(true);
  const pictureComments = pictureInfo.children[0];
  const pictureLikes = pictureInfo.children[1];
  userPicture.querySelector('.picture__img').src = picture.url;
  pictureComments.textContent = picture.id;
  pictureLikes.textContent = picture.likes;
  picturesGridFragment.append(userPicture);
});

picturesGrid.append(picturesGridFragment);
