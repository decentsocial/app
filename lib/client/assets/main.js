window.state = {}

window.fetch('/user/info')
  .then(req => req.json())
  .then(user => {
    console.log('logged in user', user)
    const els = document.querySelectorAll('.only-authenticated[hidden]')
    for (const el of els) {
      el.removeAttribute('hidden')
    }
    window.state.user = user
    return userLoggedIn(user)
  })
  .catch(err => {
    document.querySelector('#login') && document.querySelector('#login').removeAttribute('hidden')
    return userUnauthorized(err)
  })

function userLoggedIn (user) {
  const usernamePlaceholders = document.querySelectorAll('.username-placeholder')
  for (const p of usernamePlaceholders) {
    p.innerText = user.displayName || user.nickname
  }
}
function userUnauthorized (err) {
  console.info('unauthorized', err)
}
