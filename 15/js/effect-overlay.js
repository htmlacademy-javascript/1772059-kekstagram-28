const Effects = {
  default: {
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    measure: '',
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  heat: {
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    measure: '',
  },
};

let chosenEffect = Effects.default;

const pictureElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const levelEffectElement = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === Effects.default;
const openSlider = () => sliderContainerElement.classList.remove('hidden');
const closeSlider = () => sliderContainerElement.classList.add('hidden');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Effects.default.min,
      max: Effects.default.max,
    },
    step: Effects.default.step,
    start: Effects.default.max,
    connect: 'lower',
  });
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if(isDefault()) {
    closeSlider();
    return;
  }
  openSlider();
};

const onChangeEffect = (evt) => {
  chosenEffect = Effects[evt.target.value] ? Effects[evt.target.value] : Effects.default;
  pictureElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider(chosenEffect);
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  pictureElement.style.filter = isDefault()
    ? Effects.default.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.measure})`;
  levelEffectElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = Effects.default;
  updateSlider();
};

const initEffects = () => {
  createSlider();
  effectsElement.addEventListener('change', onChangeEffect);
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};


export { initEffects, resetEffects };
