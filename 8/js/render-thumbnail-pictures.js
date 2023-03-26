
const picturesGrid = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createThumbnail ({id, url, description, likes, comments }) {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.dataset.thumbnailId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
}

function renderThumbnails (thumbnails) {
  const thumbnailsFragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => {
    const thumbnailElement = createThumbnail(thumbnail);
    thumbnailsFragment.append(thumbnailElement);
  });
  picturesGrid.append(thumbnailsFragment);
}

export { renderThumbnails };
