import { renderThumbnails } from './render-thumbnail-pictures.js';
import { renderFullSizePicture } from './render-fullsize-pictures.js';

const picturesContainer = document.querySelector('.pictures');

function renderPhotoGallery (pictures) {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    renderFullSizePicture(picture);
  });
  renderThumbnails(pictures, picturesContainer);
}

export {renderPhotoGallery};
