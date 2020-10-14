import { h } from 'preact'
import Setup from '../../components/setup'
import Timeline from '../../components/timeline'
import DummyTweets from '../../components/dummy-tweets'
import MainFeatures from '../../components/main-features'

const Home = (props) => {
  if (window.location.hash && window.location.hash !== '') {
    return (
      <div class='container'>
        <h1 class='title'>Logging you in...</h1>
      </div>
    )
  }

  console.log('props.user', props.user)

  return (
    <div class='container text-center'>
      {props.user === null && <MainFeatures />}
      {(Array.isArray(props.timeline) && props.timeline.length === 0 && props.user !== null) && <DummyTweets />}
      {props.user && (
        <div class=''>
          {!props.user.setupComplete && <Setup user={props.user} />}
          {props.user.setupComplete && Array.isArray(props.timeline) && props.timeline.length > 0 &&
            <Timeline user={props.user} timeline={props.timeline} retweets={false} replies={false} />}
        </div>
      )}
    </div>
  )
}

export default Home
