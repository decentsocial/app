import { getAccessToken } from './auth-service'

const prod = !!/decent/.test(window.location.host)
const base = url => prod ? url : `http://localhost:3000${url}`
const json = (path, opt) => window.fetch(base(path), opt).then(res => res.json())
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
  return json(base('/user/info'), options())
}

export async function updateUserSettings ({ twitterHandle } = {}) {
  if (!getAccessToken()) return
  if (!twitterHandle) {
    console.log('no twitterHandle')
    return
  }
  return json(base('/user/settings'), options({
    method: 'put',
    body: JSON.stringify({ twitterHandle })
  }))
}
