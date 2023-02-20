/**
 * Checking string's length
 * @param {*string} Input string
 * @param {*number} count symbols
 */

function checkStrLength (string, countSymbols) {
  return string.length <= countSymbols;
}

checkStrLength('проверяемая строка', 20);
/**
 * Checking string for palinrome
 * @param {*string} Input string
 * @returns string
 */

function isPalindrome(string) {
  string = string.toLowerCase().replace(/\s/g, '');
  return string === string.split('').reverse().join('');
}

isPalindrome('Лёша на полке клопа нашёл ');

/**
 * Extracting numbers from a string using regular expression
 * @param {*string} Input string
 * @returns string with numbers
 */

function getNumbers(string) {
  return string.match(/[0-9]/g, '');
}

getNumbers('1 кефир, 0.5 батона');
/**
 *
 * @param {*string} general string
 * @param {*number} minimal length of the
 * @param {*string} addedString
 * @returns
 */
function addSymbols(string, minLength, addedString) {
  return string.padStart(minLength, addedString);
}

addSymbols('q', 4, 'werty');
