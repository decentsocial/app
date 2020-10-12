import { h } from 'preact'
import Setup from '../../components/setup'
import Timeline from '../../components/timeline'
import timelineStyles from '../../components/timeline.css'
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
                // <div class='mt-5 py-5'>
                //   <h3 class='title'>{props.user.nickname}, you are all set</h3>
                //   <h1 class='title'>Loading your decent Timeline..</h1>
                // </div>
                <div class='row user-select-none'>
                  <div class={timelineStyles.tweet + ' col-md-9 mx-auto p-0 border-0 py-5'}>
                    <div class=''>
                      <small class='float-right text-muted has-tooltip'>__:__AM</small>
                      <h5 class='mb-1 text-muted text-left'>
                        <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
                        @____
                      </h5>
                    </div>
                    <p class='w-100 mb-1 text-left py-2'>_________________________________________________<br />__________________________________________________________<br />________________<br />_____</p>
                  </div>
                  <div class={timelineStyles.tweet + ' col-md-9 mx-auto p-0 border-0 py-5'}>
                    <div class=''>
                      <small class='float-right text-muted has-tooltip'>__:__AM</small>
                      <h5 class='mb-1 text-muted text-left'>
                        <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
                        @_______
                      </h5>
                    </div>
                    <p class='w-100 mb-1 text-left py-2'>__________________________________<br />______________<br /></p>
                  </div>
                  <div class={timelineStyles.tweet + ' col-md-9 mx-auto p-0 border-0 py-5'}>
                    <div class=''>
                      <small class='float-right text-muted has-tooltip'>__:__PM</small>
                      <h5 class='mb-1 text-muted text-left'>
                        <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
                        @______________
                      </h5>
                    </div>
                    <p class='w-100 mb-1 text-left py-2'>_________________________________________<br />_____________________________________<br />____________________________<br />_____</p>
                  </div>
                  <div class={timelineStyles.tweet + ' col-md-9 mx-auto p-0 border-0 py-5'}>
                    <div class=''>
                      <small class='float-right text-muted has-tooltip'>__:__PM</small>
                      <h5 class='mb-1 text-muted text-left'>
                        <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
                        @_________
                      </h5>
                    </div>
                    <p class='w-100 mb-1 text-left py-2'>_____________________________<br />______________________________________________________<br />________________<br />_________________________________________</p>
                  </div>
                  <div class={timelineStyles.tweet + ' col-md-9 mx-auto p-0 border-0 py-5'}>
                    <div class=''>
                      <small class='float-right text-muted has-tooltip'>__:__PM</small>
                      <h5 class='mb-1 text-muted text-left'>
                        <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
                        @_______
                      </h5>
                    </div>
                    <p class='w-100 mb-1 text-left py-2'>_______________<br />_________________________<br /></p>
                  </div>
                </div>
              )}
              {(Array.isArray(props.timeline) && props.timeline.length > 0) &&
                <Timeline user={props.user} timeline={props.timeline} retweets={false} replies={false} />}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
