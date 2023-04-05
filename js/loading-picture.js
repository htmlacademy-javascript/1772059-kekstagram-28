const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

const fileChooser = document.querySelector('.img-upload__form');
const preview = document.querySelector('.img-upload__preview img');
const filtersPreview = fileChooser.querySelectorAll('.effects__preview');

const loadPicture = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    for(let i = 0; i < filtersPreview.length; ++i) {
      filtersPreview[i].style.backgroundImage = `url("${ url }")`;
    }
    return true;
  }
  return false;
};

export { loadPicture };
