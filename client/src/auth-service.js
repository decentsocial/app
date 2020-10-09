import decode from 'jwt-decode'
import auth0 from 'auth0-js'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'

const prod = !!/decent/.test(window.location.host)

const CLIENT_ID = 'LtQcR4ReApkJsMgLkuwX3Q7ciAzahUwk'
const CLIENT_DOMAIN = 'decentsocial.eu.auth0.com'
const REDIRECT = prod ? '/callback' : 'http://localhost:3000/callback'
// const REDIRECT = 'http://localhost:3000/callback'
const SCOPE = ''
const AUDIENCE = 'https://api.decent.social'

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
})

window.addEventListener('load', () => {
  if (!window.location.hash) return
  console.log('parseHash', window.location.hash)
  auth.parseHash(function (err, authResult) {
    if (err) {
      return console.log(err)
    }
    console.log(authResult)
    setIdToken()
    setAccessToken()
    window.location.replace('/')
  })
})

window.auth = auth

export function login () {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  })
}

export function logout () {
  clearIdToken()
  clearAccessToken()
  window.location.href = '/'
}

export function getIdToken () {
  return window.localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken () {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
  const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export function setAccessToken () {
  const accessToken = getParameterByName('access_token')
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export function setIdToken () {
  const idToken = getParameterByName('id_token')
  window.localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && idToken !== 'null' && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token || !token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
