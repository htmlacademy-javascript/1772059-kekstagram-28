const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const zoomOutElement = document.querySelector('.scale__control--smaller');
const zoomInElement = document.querySelector('.scale__control--bigger');
const scaledValueElement = document.querySelector('.scale__control--value');
const scaledElement = document.querySelector('.img-upload__preview');

const scalePicture = (value) => {
  scaledElement.style.transform = `scale(${value / 100})`;
  scaledValueElement.value = `${value}%`;
};

const onZoomOutButtonClick = () => {
  const currentValue = parseInt(scaledValueElement.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scalePicture(newValue);
};

const onZoomInButtonClick = () => {
  const currentValue = parseInt(scaledValueElement.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scalePicture(newValue);
};

const resetScale = () => scalePicture(DEFAULT_SCALE);

const initScale = () => {
  zoomOutElement.addEventListener('click', onZoomOutButtonClick);
  zoomInElement.addEventListener('click', onZoomInButtonClick);
};


export { resetScale, initScale };

