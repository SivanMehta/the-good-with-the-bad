// adapted from here:
// https://github.com/SivanMehta/treedoff/blob/master/src/modules/Auth.js

/* global localStorage */

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}


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
    const token = credentials.Username + "|" + credentials.Password
    fetch('/api/auth', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(checkStatus)
      .then(() => btoa(token))
      .then(token => localStorage.setItem(this.tokenName, token))
      .then(() => cb(true))
      .catch(error => this.deauthenticateUser(cb))
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
