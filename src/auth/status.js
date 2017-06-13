// adapted from here:
// https://github.com/SivanMehta/treedoff/blob/master/src/modules/Auth.js

/* global localStorage */

class Status {
  /**
   * Authenticate a user. Save a token string in Local Storage
   * should actually be hitting server to check for validity,
   * but just have a simple button for now
   *
   * @param {string} token
   */
  static authenticateUser (token, cb) {
    localStorage.setItem('token', token)
    setTimeout(cb, 100) // fake async
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated () {
    return localStorage.getItem('token') !== null
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser (cb) {
    localStorage.removeItem('token')
    setTimeout(cb, 100) // fake async
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken () {
    return localStorage.getItem('token')
  }
}

export default Status
