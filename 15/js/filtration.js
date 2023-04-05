import { renderThumbnails } from './render-thumbnail-pictures.js';
import { shuffleArray, debounce } from './utils.js';

const RANDOM_THUMBNAILS_ID = 'filter-random';
const DISCUSSED_THUMBNAILS_ID = 'filter-discussed';
const RANDOM_COUNTER = 10;
const RERENDER_DELAY = 500;

const imageFilters = document.querySelector('.img-filters');

const removeItems = (items) => items.forEach((item) => item.remove());

const setButtonState = (target) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');
};

const onFiltrationButtonClick = (target, data) => {
  let dataCopy = data.slice();
  removeItems(document.querySelectorAll('.picture'));
  setButtonState(target);

  if(target.id === DISCUSSED_THUMBNAILS_ID) {
    dataCopy = dataCopy.sort((a,b) => b.comments.length - a.comments.length);
  }

  if(target.id === RANDOM_THUMBNAILS_ID) {
    dataCopy = shuffleArray(dataCopy).slice(0, RANDOM_COUNTER);
  }

  renderThumbnails(dataCopy);
};

const rerenderTimeout = debounce((id, data) => onFiltrationButtonClick(id, data), RERENDER_DELAY);

const initFilters = (data) => {
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', (evt) => {
    if(evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      rerenderTimeout(evt.target, data);
    }
  });
};

export { initFilters };
