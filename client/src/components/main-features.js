import { h } from 'preact'
import { login } from '../auth-service'

const MainFeatures = (props) => {
  return (
    <div class='row mt-5'>
      <div class='col-md-12'>
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
          <video controls autoPlay loop class='img-fluid mt-5'>
            <source src='https://decent.social/video/app.decent.social-browsing-timeline.mp4' type='video/mp4' />
            <source src='https://decent.social/video/app.decent.social-browsing-timeline.webm' type='video/webm' />
            <p>Your browser doesn't support HTML5 video. Here is
              a <a href='https://decent.social/video/app.decent.social-browsing-timeline.mp4'>link to the video</a> instead.
            </p>
          </video>

          <h1 class='title mt-5 mb-3'>Powerful search</h1>
          <p class='lead'>
            Search through your timeline, extremely fast and intuitive.
            <br />
            <br />
            <b>Activate the search bar</b> through the keyboard shorcut <b>shift + /</b>.
            <br />
            <br />
            Looking for an account? Put an <b>@</b> in front of your search term.
            <br />
            <br />
            Just looking for a topic, e.g. "open source"? You already know what to do.
          </p>
          <video controls autoPlay loop class='img-fluid mt-5'>
            <source src='https://decent.social/video/app.decent.social-search.mp4' type='video/mp4' />
            <source src='https://decent.social/video/app.decent.social-search.webm' type='video/webm' />
            <p>Your browser doesn't support HTML5 video. Here is
              a <a href='https://decent.social/video/app.decent.social-search.mp4'>link to the video</a> instead.
            </p>
          </video>

          <h1 class='title mt-5 mb-3'>Simple settings</h1>
          <p class='lead'>
            Intuitive and minimal settings to customize your timeline.
            <br />
            <br />
            There will be added more customizations based on your feedback.
            <br />
            <br />
            So let me know what you think by <a href='https://decent.social/#cta'>subscribing to the newsletter</a>
            <br />
            <br />
            Get in touch with me!
          </p>
          <video controls autoPlay loop class='img-fluid mt-5'>
            <source src='https://decent.social/video/app.decent.social-settings.mp4' type='video/mp4' />
            <source src='https://decent.social/video/app.decent.social-settings.webm' type='video/webm' />
            <p>Your browser doesn't support HTML5 video. Here is
              a <a href='https://decent.social/video/app.decent.social-settings.mp4'>link to the video</a> instead.
            </p>
          </video>

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
      </div>
    </div>
  )
}

export default MainFeatures
