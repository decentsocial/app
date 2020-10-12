import { h } from 'preact'
import Setup from '../../components/setup'
import Timeline from '../../components/timeline'
import MainFeatures from '../../components/main-features'

const Home = (props) => {
  console.log('window.location.hash', window.location.hash)
  if (window.location.hash && window.location.hash !== '') {
    return (
      <div class='container'>
        <h1 class='title'>Logging you in...</h1>
      </div>
    )
  }

  return (
    <div class='container text-center'>
      {props.user === null && <MainFeatures />}
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
              <Timeline style='margin-top: -5vh1' user={props.user} timeline={props.timeline} retweets={false} replies={false} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
