import { h } from 'preact'
import { login } from '../../auth-service'
import Setup from '../../components/setup'
import Timeline from '../../components/timeline'

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
    <div class='container'>
      {props.user === null && (
        <div class='py-5 mt-5'>
          <p><a href='#' tabIndex={1} onClick={login} class='btn btn-primary btn-sm'>Login</a> and enjoy a decent Twitter reading experience</p>
          <h1 class='title mt-5 mb-3'>Clean Twitter reading experience</h1>
          <p class='lead'>
            Through client side caching and diffing we exchange just enough information to reconstruct your private Twitter timeline.
            <br />
            <br />
            Decent aims to be <b>super accessible</b> and <b>friendly for vim-minded folks</b>
            <br />
            <br />
            Navigate the timeline using <code>TAB</code>, your mouse, or finger since Decent runs on the Web!
          </p>
          <video class='img-fluid mt-5' src='https://decent.social/video/app.decent.social-browsing-timeline.mov' autoPlay controls />

          <h1 class='title mt-5 mb-3'>Powerful search</h1>
          <p class='lead'>
            Search through your timeline, extremely fast and intuitive.
            <br />
            <br />
            <b>Activate the search bar</b> through the keyboard shorcut <b>alt + s</b>.
            <br />
            <br />
            Looking for an account? Put an <b>@</b> in front of your search term.
            <br />
            <br />
            Just looking for a topic, e.g. "open source"? You already know what to do.
          </p>
          <video class='img-fluid mt-5' src='https://decent.social/video/app.decent.social-search.mov' autoPlay controls />

          <h1 class='title mt-5 mb-3'>Simple settings</h1>
          <p class='lead'>
            Intuitive and minimal settings to customize your timeline.
            <br />
            <br />
            There will be added more customizations based on your feedback.
            <br />
            <br />
            So let me know what you think by <a href='https://decent.social/#cta'>subscribing to the newsletter</a> and get in touch with me!
          </p>
          <video class='img-fluid mt-5' src='https://decent.social/video/app.decent.social-settings.mov' autoPlay controls />

          <h1 class='title mt-5 mb-3'>What are you waiting for?</h1>
          <p class='lead'>
            <h2>Try it out</h2>
            <br />
            It's free during beta
            <br />
            <br />
            <a href='#' tabIndex={1} onClick={login} class='btn btn-primary btn-sm'>Login</a> and enjoy a decent Twitter reading experience
          </p>
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
