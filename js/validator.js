
const pictureForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error',
});

pictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    console.log('Available for sending');
  } else {
    console.log('Unavailable for sending');
  }
});

