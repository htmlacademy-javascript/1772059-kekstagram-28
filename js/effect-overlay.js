const Effects = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    measure: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    measure: '',
  },
];

const DEFAULT_EFFECT = Effects[0];
let chosenEffect = DEFAULT_EFFECT;

const pictureElement = document.querySelector('.img-upload__preview');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const levelEffectElement = document.querySelector('.effect-level__value');

function isDefault () {
  return chosenEffect === DEFAULT_EFFECT;
}

function openSlider () {
  sliderContainerElement.classList.remove('hidden');
}

function closeSlider () {
  sliderContainerElement.classList.add('hidden');
}

function updateSlider () {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start:chosenEffect.max,
  });

  if(isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
}

function onChangeEffect (evt) {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = Effects.find((effect) => effect.name === evt.target.value);
  pictureElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
}

function onSliderUpdate () {
  const sliderValue = sliderElement.noUiSlider.get();
  pictureElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.measure})`;
  levelEffectElement.value = sliderValue;
}

function resetEffects () {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
}

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

closeSlider();

effectsElement.addEventListener('change', onChangeEffect);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
