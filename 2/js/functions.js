/**
 * Checking string's length
 * @param {*string} Input string
 * @param {*number} count symbols
 */

function checkStrLength (string, countSymbols) {
  return string.length <= countSymbols;
}

/**
 * Checking string for palinrome
 * @param {*string} Input string
 * @returns string
 */

function isPalindrome(string) {
  string = string.toLowerCase().replace(/\s/g, '');
  return string === string.split('').reverse().join('');
}

/**
 * Extracting numbers from a string using regular expression
 * @param {*string} Input string
 * @returns string with numbers
 */

function getNumbers(string) {
  return string.match(/[0-9]/g, '');
}

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
