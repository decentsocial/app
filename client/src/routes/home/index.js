import { h } from 'preact'
import { Link } from 'preact-router/match'
import { login } from '../../auth-service'

const events = {
  handleSubmitSetup: (event) => {
    let twitterHandle = event.target.querySelector('#twitterHandle').value
    twitterHandle = twitterHandle.replace('@', '')
    console.log('twitterHandle', twitterHandle)
    event.preventDefault()
  }
}

const Home = (props) => {
  return (
    <div class='container py-5'>
      <h1 class='title mb-5'>Welcome to Decent</h1>
      {props.user === null && <p><span onClick={login} class='btn btn-sm' href='/'>Login</span> and enjoy a decent Twitter reading experience</p>}
      {props.user && !props.user.setupComplete && (
        <form onSubmit={events.handleSubmitSetup}>
          <div class='form-group'>
            <label for='twitterHandle' class='col-form-label'>Enter your Twitter handle if you want to retrieve the current users you follow</label>&nbsp;
            <div class=''>
              <input type='text' class='form-control' placeholder='@elonmusk' id='twitterHandle' aria-describedby='twitterHandleHelp' />
              <small id='twitterHandleHelp' class='form-text text-muted'>We'll never share your Twitter handle with anyone else.</small>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default Home
