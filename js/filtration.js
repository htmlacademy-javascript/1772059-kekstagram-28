import { renderThumbnails } from './render-thumbnail-pictures.js';

const imageFilters = document.querySelector('.img-filters');
const RANDOM_THUMBNAIS_ID = 'filter-random';
const DISCUSSED_THUMBMAILS_ID = 'filter-discussed';
const DEFAULT_THUMBNAILS_ID = 'filter-default';

const isNotActiveButton = (evt) => evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active');

const rerenderThumbnails = (data, id) => {
  let copy = data.slice();
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  if(id === DISCUSSED_THUMBMAILS_ID) {
    copy = copy.sort((a, b) => a.comments.length - b.comments.length);
  }
  renderThumbnails(copy);
};

const onFiltrationButtonClick = (evt, data) => {
  if (isNotActiveButton(evt)) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    const id = evt.target.id;
    rerenderThumbnails(data, id);
  }
};

const initFilters = (data) => {
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', (evt) => {
    onFiltrationButtonClick(evt, data);
  });
};

export { initFilters };
