import { h } from 'preact'
import { Link } from 'preact-router/match'
import { login } from '../../auth-service'

const events = {
  handleSubmitSetup: (event) => {
    let twitterHandle = event.target.querySelector('#twitterHandle').value
    let followingList = event.target.querySelector('#followingList').value
    twitterHandle = twitterHandle.replace('@', '')
    followingList = followingList.replace(/@/gi, '').split(' ').filter(Boolean)
    console.log('twitterHandle', twitterHandle)
    console.log('followingList', followingList)
    event.preventDefault()
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
      {props.user === null && <p><a href='#' onClick={login} class='btn btn-primary btn-sm' href='/'>Login</a> and enjoy a decent Twitter reading experience</p>}
      {props.user && !props.user.setupComplete && (
        <form onSubmit={events.handleSubmitSetup}>
          <div class='form-group mb-5'>
            <label for='twitterHandle' class='col-form-label'>Enter your Twitter handle if you want to retrieve the current users you follow</label>&nbsp;
            <div class=''>
              <input type='text' class='form-control' placeholder='@elonmusk' id='twitterHandle' aria-describedby='twitterHandleHelp' />
              <small id='twitterHandleHelp' class='form-text text-muted'>We'll never share your Twitter handle with anyone else.</small>
            </div>
          </div>
          <div class='form-group mb-5'>
            <p class='lead'>
            If you prefer, enter below the users you want to follow
            </p>
            <textarea class='form-control' id='followingList' rows='3'>
              @elonmusk
              @lexfridman
              @MKBHD
            </textarea>
            <small id='followingListHelp' class='form-text text-muted'>You can always change this later on, no worries.</small>
          </div>
          <button class='btn btn-md btn-primary'>Complete setup</button>
        </form>
      )}
    </div>
  )
}

export default Home
