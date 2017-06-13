// adapted from here:
// https://github.com/SivanMehta/treedoff/blob/master/src/modules/Auth.js

/* global localStorage */

class Status {
  static tokenName = 'auth-token'

  /**
   * Authenticate a user. Save a token string in Local Storage
   * should actually be hitting server to check for validity,
   * but just have a simple button for now
   *
   * @param {string} token
   */
  static authenticateUser (credentials, cb) {
    var token = credentials.UserName + "|" + credentials.Password
    token = btoa(token)
    localStorage.setItem(this.tokenName, token)
    setTimeout(cb, 100) // fake async
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated () {
    return localStorage.getItem(this.tokenName) !== null
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser (cb) {
    localStorage.removeItem(this.tokenName)
    setTimeout(cb, 100) // fake async
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken () {
    return localStorage.getItem(this.tokenName)
  }
}

export default Status
