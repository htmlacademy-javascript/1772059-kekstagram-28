
const MAX_COUNT_HASHTAG = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TEXT_HASHTAG_LENGTH = 'Превышено количество хэштегов или общая длина';
const ERROR_TEXT_HASHTAG_INVALID_SYMBOL = 'Недопустимый символ или несоответствующая длина хэштега';
const ERROR_TEXT_HASHTAG_NON_UNIQUE = 'Повторяющийся хэштег';

const pictureForm = document.querySelector('.img-upload__form');
const hashtagField = pictureForm.querySelector('.text__hashtags');

const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagField, validateHashtagsLength, ERROR_TEXT_HASHTAG_LENGTH);
pristine.addValidator(hashtagField, validateHashtagSymbols, ERROR_TEXT_HASHTAG_INVALID_SYMBOL);
pristine.addValidator(hashtagField, validateHashtagUnique, ERROR_TEXT_HASHTAG_NON_UNIQUE);

function filteredHashtag(value) {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return tags;
}

function hasValidatedHashtagLength (tags) {
  return tags.length <= MAX_COUNT_HASHTAG;
}

function hasUniqueSymbols (tags) {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
}

function isValidHashtag (tag) {
  return VALID_SYMBOLS.test(tag);
}

function validateHashtagsLength (value) {
  const tags = filteredHashtag(value);
  return hasValidatedHashtagLength(tags);
}

function validateHashtagSymbols (value) {
  const tags = filteredHashtag(value);
  return tags.every(isValidHashtag);
}

function validateHashtagUnique (value) {
  const tags = filteredHashtag(value);
  return hasUniqueSymbols(tags);
}

pictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

