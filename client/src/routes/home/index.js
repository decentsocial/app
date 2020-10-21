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

  return (
    <div class='container'>
      {props.user === null && <MainFeatures />}
      {props.user && !props.user.setupComplete && (
        <div class='mt-5'>
          <h1 class='title display-3'>Welcome to Decent.social</h1>
          <h3 class='title'>One more step and you're ready to enjoy your decent timeline</h3>
          <Setup user={props.user} />
        </div>
      )}
      {props.user && props.user.setupComplete && Array.isArray(props.timeline) && props.timeline.length > 0 &&
        <Timeline user={props.user} timeline={props.timeline} retweets={false} replies={false} />}
      {(Array.isArray(props.timeline) && props.timeline.length === 0 && props.loadingTimeline) && <DummyTweets />}
    </div>
  )
}

export default Home
