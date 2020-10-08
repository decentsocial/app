import * as AuthService from './auth-service'

export function getUserInfo (getAccessToken = AuthService.getAccessToken) {
  return window.fetch(/decent/.test(window.location.host) ? '/user/info' : 'http://localhost:3000/user/info', {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  })
    .then(res => res.json())
}
