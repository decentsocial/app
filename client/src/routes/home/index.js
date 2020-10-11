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
    <div class='container'>
      {/* {(!props.user || (props.user && props.user.setupComplete)) &&
        <h1 class='title mb-5'>Welcome to Decent</h1>} */}
      {props.user === null && (
        <div class='py-5 mt-5'>
          <p><a href='#' tabIndex={1} onClick={login} class='btn btn-primary btn-sm'>Login</a> and enjoy a decent Twitter reading experience</p>
        </div>
      )}
      {props.user && (
        <div class=''>
          {!props.user.setupComplete && <Setup user={props.user} />}
          {props.user.setupComplete && (
            <div class=''>
              {(!Array.isArray(props.timeline) || props.timeline.length === 0) && (
                <div class='mt-5 py-5'>
                  <h3 class='title'>{props.user.nickname}, you are all set</h3>
                  <h1 class='title'>Loading your decent Timeline..</h1>
                </div>
              )}
              <Timeline style='margin-top: -5vh1' user={props.user} timeline={props.timeline} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
