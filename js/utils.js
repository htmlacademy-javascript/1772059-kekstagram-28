const isEscapeKey = (evt) => evt.key === 'Escape';

const shuffleArray = (array) => {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
const debounce = (cb, timeOutDelay) => {
  let timeOutId;

  return (...rest) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => cb.apply(this, rest), timeOutDelay);
  };
};
export { isEscapeKey, shuffleArray, debounce };
