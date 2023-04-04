const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const PERCENT_DIVIDER = 100;

const zoomOutElement = document.querySelector('.scale__control--smaller');
const zoomInElement = document.querySelector('.scale__control--bigger');
const scaledValueElement = document.querySelector('.scale__control--value');
const scaledElement = document.querySelector('.img-upload__preview img');

const scalePicture = (value) => {
  scaledElement.style.transform = `scale(${value / PERCENT_DIVIDER})`;
  scaledValueElement.value = `${value}%`;
};

const onZoomOutButtonClick = () => {
  const currentValue = parseInt(scaledValueElement.value, 10);
  if (currentValue > MIN_SCALE) {
    scalePicture(currentValue - SCALE_STEP);
  }
};

const onZoomInButtonClick = () => {
  const currentValue = parseInt(scaledValueElement.value, 10);
  if (currentValue < MAX_SCALE) {
    scalePicture(currentValue + SCALE_STEP);
  }
};

const resetScale = () => scalePicture(DEFAULT_SCALE);

const initScale = () => {
  zoomOutElement.addEventListener('click', onZoomOutButtonClick);
  zoomInElement.addEventListener('click', onZoomInButtonClick);
};


export { resetScale, initScale };

