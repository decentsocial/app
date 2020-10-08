import { h } from 'preact'
import { Link } from 'preact-router/match'
import { login } from '../../auth-service'

const Home = (props) => {
  return (
    <div class='container py-5'>
      <h1 class='title mb-5'>Welcome to Decent</h1>
      {props.user === null && <p><span onClick={login} class='btn btn-sm' href='/'>Login</span> and enjoy a decent Twitter reading experience</p>}
      {props.user && !props.user.setupComplete && (
        <form class='form'>
          <div class='form-group'>
            <label for='handle'>Enter your Twitter handle if you want to retrieve the current users you follow</label>&nbsp;
            <input type='text' class='form-control' placeholder='@elonmusk' id='handle' aria-describedby='twitterHandleHelp' />
          </div>
          <small id='twitterHandleHelp' class='form-text text-muted'>We'll never share your Twitter handle with anyone else.</small>
        </form>
      )}
    </div>
  )
}

export default Home
