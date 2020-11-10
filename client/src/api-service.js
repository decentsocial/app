import { getAccessToken } from './auth-service'

const prod = !!/decent/.test(window.location.host)
const base = url => (prod || url.startsWith('http')) ? url : `http://localhost:3000${url}`
const json = (path, opt) => window.fetch(base(path), opt).then(res => res.json())
const options = ({ Authorization = `Bearer ${getAccessToken()}`, method = 'get', body } = {}) => ({
  method,
  body,
  credentials: 'include',
  headers: {
    Authorization,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function getUserInfo () {
  if (!getAccessToken()) {
    console.log('no access token')
    throw new Error('no access token')
  }
  return json(base('/user/info'), options())
}

export async function getUserTimeline ({ since } = {}) {
  if (!getAccessToken()) {
    console.log('no access token')
    throw new Error('no access token')
  }
  const query = since ? `?since=${since}` : ''
  return json(base('/user/timeline' + query), options())
}

export async function getUserFollowing ({ twitterHandle } = {}) {
  if (!getAccessToken()) throw new Error('no access token')
  if (!twitterHandle) {
    console.log('no twitterHandle')
    throw new Error('no twitter handle')
  }
  return json(base(`/api/following/${twitterHandle}`), options())
}
export async function updateUserSettings ({ twitterHandle, following } = {}) {
  if (!getAccessToken()) throw new Error('no access token')
  if (!twitterHandle && !Array.isArray(following)) {
    console.log('no twitterHandle and following')
    throw new Error('no twitter handle and following')
  }
  return json(base('/user/settings'), options({
    method: 'put',
    body: JSON.stringify({ twitterHandle, following })
  }))
}

export async function getSetup () {
  if (!getAccessToken()) throw new Error('no access token')
  return json(base('/setup'), options())
}

export async function saveCheckoutSession (session = {}) {
  if (!getAccessToken()) throw new Error('no access token')
  return json(base('/checkout-session'), options({
    method: 'POST',
    body: JSON.stringify(session)
  }))
}

export function getCheckoutSession (sessionId) {
  if (!getAccessToken()) throw new Error('no access token')
  return json(base('/checkout-session?sessionId=' + sessionId), options())
}

export function postCreateCheckoutSession (priceId) {
  if (!getAccessToken()) throw new Error('no access token')
  return json(base('/create-checkout-session'), options({
    method: 'POST',
    body: JSON.stringify({
      priceId: priceId
    })
  }))
}
