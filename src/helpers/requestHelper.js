/**
 *this uses the status of a request to generate a color
 * @param {object} status this is the status of
 * the request
 * @returns {string}  a string representation of the color
 */
export function getColor(status) {
  switch (status) {
  case 'pending':
    return 'orange';
  case 'approved':
    return 'green';
  case 'resolved':
    return 'green';
  case 'disapproved':
    return 'red';
  default:
    return '';
  }
}

/**
   *this uses the status of a request to generate a color
   * @param {object} status this is the status of
   * the request
   * @returns {string}  a string representation of the color
   */
export function getIconType(status) {
  switch (status) {
  case 'pending':
    return 'hourglass half';
  case 'resolved':
    return 'check';
  case 'approved':
    return 'check circle outline';
  case 'disapproved':
    return 'cancel';
  default:
    return '';
  }
}

/**
   * This takes a string, which may be a sentence or a
   * word, and capitalizes the first letter of the string
   * @param {string} str the string to be capitalized
   * @returns {string} returns the new string
   */
export function capitalizeWord(str) {
  return str.substr(0, 1).toUpperCase()
    + str.substr(1).toLowerCase();
}
