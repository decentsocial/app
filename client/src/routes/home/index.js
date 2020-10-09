import { h } from 'preact'
import { login } from '../../auth-service'
import Setup from '../../components/setup'
import Timeline from '../../components/timeline'

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
      {/* {(!props.user || (props.user && props.user.setupComplete)) &&
        <h1 class='title mb-5'>Welcome to Decent</h1>} */}
      {!props.user &&
        <p><a href='#' onClick={login} class='btn btn-primary btn-sm'>Login</a> and enjoy a decent Twitter reading experience</p>}
      {props.user && !props.user.setupComplete && <Setup user={props.user} />}
      {props.user && props.user.setupComplete && (
        <div class='py-5'>
          {(!Array.isArray(props.timeline) || props.timeline.length === 0) && (
            <div>
              <h3 class='title'>{props.user.nickname}, you are all set</h3>
              <h1 class='title'>Loading your decent Timeline for the first time..</h1>
            </div>
          )}
          <Timeline user={props.user} timeline={props.timeline} />
        </div>
      )}
    </div>
  )
}

export default Home
