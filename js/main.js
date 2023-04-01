import { renderThumbnails } from './render-thumbnail-pictures.js';
import { initPictureEditor } from './uploding-picture.js';

const URL = 'https://28.javascript.pages.academy/kekstagram/data';
//renderThumbnails();
initPictureEditor();

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    renderThumbnails(data);
  });


