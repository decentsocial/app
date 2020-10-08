import { getAccessToken } from './auth-service'

const prod = !!/decent/.test(window.location.host)
const base = url => prod ? url : `http://localhost:3000${url}`
const options = ({ Authorization = `Bearer ${getAccessToken()}`, method = 'get', body } = {}) => ({
  method,
  body,
  headers: {
    Authorization,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function getUserInfo () {
  if (!getAccessToken()) {
    console.log('no access token')
    return
  }
  return window.fetch(base('/user/info'), options())
    .then(res => res.json())
}

export async function updateUserSettings ({ twitterHandle } = {}) {
  if (!getAccessToken()) return
  if (!twitterHandle) {
    console.log('no twitterHandle')
    return
  }
  return window.fetch(base('/user/settings'), options({
    method: 'put',
    body: JSON.stringify({ twitterHandle })
  }))
    .then(res => res.json())
}
