import { createPhotoGallery} from './data.js';
import { isEscapeKey } from './utils.js';

const picturesGrid = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const fullSizePicture = document.querySelector('.big-picture');
const socialComment = fullSizePicture.querySelector('.social__comment');
const cancel = fullSizePicture.querySelector('#picture-cancel');

const similarPictures = createPhotoGallery();
const picturesGridFragment = document.createDocumentFragment();

similarPictures.forEach((picture) => {

  const userPicture = pictureTemplate.firstElementChild.cloneNode(true);
  const pictureInfo = userPicture.querySelector('.picture__info');
  
  const pictureComments = pictureInfo.querySelector('.picture__comments');
  const pictureLikes = pictureInfo.querySelector('.picture__likes');
  const {url, likes, id, description, comments} = picture;

  userPicture.querySelector('.picture__img').src = url;
  pictureComments.textContent = id;
  pictureLikes.textContent = likes;
  picturesGridFragment.append(userPicture);

  userPicture.addEventListener('click', () => {
    const likesCount = fullSizePicture.querySelector('.likes-count');
    const commentsCount = fullSizePicture.querySelector('.comments-count');
    const descriptionFullSizePicture = fullSizePicture.querySelector('.social__caption');

    fullSizePicture.querySelector('img').src = url;
    descriptionFullSizePicture.textContent = description;
    likesCount.textContent = likes;
    commentsCount.textContent = id;

    const commentPicture = socialComment.querySelector('.social__picture');
    const commentText = socialComment.querySelector('.social__text');
    commentPicture.src = comments.avatar;
    commentPicture.alt = comments.name;
    commentText.textContent = comments.message;

    openFullSizePicture();
  });

});


function openFullSizePicture () {

  fullSizePicture.querySelector('.social__comment-count').classList.add('hidden');
  fullSizePicture.querySelector('.comments-loader').classList.add('hidden');

  fullSizePicture.classList.remove('hidden');
  fullSizePicture.classList.add('modal-open');
  cancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    fullSizePicture.classList.add('hidden');
  });

  closeFullSizePicture();
}

function closeFullSizePicture() {
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      fullSizePicture.classList.add('hidden');
    }
  });
}

picturesGrid.append(picturesGridFragment);
export {picturesGrid};
