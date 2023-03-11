import { createPhotoGallery} from './data.js';
import { isEscapeKey } from './utils.js';

const picturesGrid = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureInfo = pictureTemplate.querySelector('.picture__info');


const bigPicture = document.querySelector('.big-picture');
const socialComment = bigPicture.querySelector('.social__comment');
const cancel = bigPicture.querySelector('#picture-cancel');

const similarPictures = createPhotoGallery();
const picturesGridFragment = document.createDocumentFragment();

similarPictures.forEach((picture) => {
  const userPicture = pictureTemplate.firstElementChild.cloneNode(true);
  const pictureComments = pictureInfo.querySelector('.picture__comments');
  const pictureLikes = pictureInfo.querySelector('.picture__likes');
  const {url, likes, id, description, comments} = picture;

  userPicture.querySelector('.picture__img').src = url;
  pictureComments.textContent = id;
  pictureLikes.textContent = likes;
  picturesGridFragment.append(userPicture);

  userPicture.addEventListener('click', () => {
    const likesCount = bigPicture.querySelector('.likes-count');
    const commentsCount = bigPicture.querySelector('.comments-count');
    const descriptionBigPicture = bigPicture.querySelector('.social__caption');

    bigPicture.querySelector('img').src = url;
    descriptionBigPicture.textContent = description;
    likesCount.textContent = likes;
    commentsCount.textContent = id;

    const commentPicture = socialComment.querySelector('.social__picture');
    const commentText = socialComment.querySelector('.social__text');
    commentPicture.src = comments.avatar;
    commentPicture.alt = comments.name;
    commentText.textContent = comments.message;
    openBigPicture();
  });

});


function openBigPicture () {

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.classList.remove('hidden');
  bigPicture.classList.add('modal-open');
  cancel.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  });

  closeBigPicture();
}

function closeBigPicture() {
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });
}

picturesGrid.append(picturesGridFragment);


export {picturesGrid};
