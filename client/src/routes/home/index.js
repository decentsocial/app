import { h } from 'preact'
import { Link } from 'preact-router/match'
import { login, getAccessToken } from '../../auth-service'

const events = {
  handleSubmitSetup: (event) => {
    event.preventDefault()

    let twitterHandle = event.target.querySelector('#twitterHandle').value
    let followingList = event.target.querySelector('#followingList').value
    twitterHandle = twitterHandle.replace('@', '')
    followingList = followingList.replace(/@/gi, '').split(' ').filter(Boolean)
    console.log('twitterHandle', twitterHandle)
    console.log('followingList', followingList)
    if (twitterHandle) {
      window.fetch(/decent/.test(window.location.host) ? '/user/settings' : 'http://localhost:3000/user/settings', {
        method: 'put',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: { twitterHandle }
      })
        .then(res => res.json())
        .then(settings => {
          console.log('updated settings', settings)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}

const Home = (props) => {
  console.log('window.location.hash', window.location.hash)
  if (window.location.hash) {
    return (
      <div class='container'>
        <h1 class='title'>Logging you in...</h1>
      </div>
    )
  }
  return (
    <div class='container py-5'>
      <h1 class='title mb-5'>Welcome to Decent</h1>
      {props.user === null && <p><a href='#' onClick={login} class='btn btn-primary btn-sm'>Login</a> and enjoy a decent Twitter reading experience</p>}
      {props.user && !props.user.setupComplete && (
        <form onSubmit={events.handleSubmitSetup}>
          <div class='row'>
            <div class='col-md-6 form-group mb-5'>
              <label for='twitterHandle' class='col-form-label'>
                <b>Enter your Twitter handle</b><br />Retrieve the current users you follow
              </label>&nbsp;
              <div class=''>
                <input type='text' class='form-control' placeholder='@elonmusk' id='twitterHandle' aria-describedby='twitterHandleHelp' />
                <small id='twitterHandleHelp' class='form-text text-muted'>We'll never share your Twitter handle with anyone else.</small>
              </div>
            </div>
            <div class='col-md-6 form-group mb-5'>
              <p class='lead'>If you prefer, enter below the users you want to follow</p>
              <textarea class='form-control' id='followingList' rows='1'>
              @elonmusk
              @lexfridman
              @MKBHD
              </textarea>
              <small id='followingListHelp' class='form-text text-muted'>You can always change this later on, no worries.</small>
            </div>
          </div>
          <div class='col-sm-12'>
            <button class='btn btn-md btn-primary'>Complete setup</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Home
