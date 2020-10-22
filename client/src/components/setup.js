import { h, Component } from 'preact'
import { route } from 'preact-router'
// import { updateUserSettings } from '../api-service'
import useStore from '../store'

class Setup extends Component {
  handleSubmitSetup (event, loadingSetup) {
    event.preventDefault()
    if (loadingSetup) return

    let twitterHandle = event.target.querySelector('#twitterHandle').value
    let following = event.target.querySelector('#following').value
    twitterHandle = twitterHandle.replace('@', '')
    following = following.replace(/@/gi, '').split(' ').filter(Boolean)
    console.log('twitterHandle', twitterHandle)
    console.log('following', following)
    if (twitterHandle || following) {
      const options = {}
      if (twitterHandle) options.twitterHandle = twitterHandle
      if (following) options.following = following
      console.log('settings with options', options)
      const state = useStore.getState()
      state.updateUserSettings(options)
        .then(() => state.getUserTimeline({ force: true }))
        .then(() => { window.location.href = '/' })
    }
  }

  render (props) {
    if (!props.user) return null

    const loadingSetup = useStore(state => state.loadingSetup)

    const { settings } = props.user
    const followingText = settings.following ? settings.following.map(t => `@${t}`).join(' ') : ''

    return (
      <form class='mt-5' onSubmit={e => this.handleSubmitSetup(e, loadingSetup)}>
        <div class='row'>
          <div class='col-lg-6 form-group mb-5'>
            <label for='twitterHandle' class='col-form-label'>
              <b>Enter your Twitter handle</b><br />Retrieve the current users you follow
            </label>&nbsp;
            <div class=''>
              <input type='text' class='form-control' placeholder={settings.twitterHandle || '@...'} id='twitterHandle' aria-describedby='twitterHandleHelp' />
              <small id='twitterHandleHelp' class='form-text text-muted'>We'll never share your Twitter handle with anyone else.</small>
            </div>
          </div>
          <div class='col-lg-6 form-group mb-5'>
            <p class='lead mt-3'>If you prefer, enter below the users you want to follow</p>
            <textarea class='form-control' id='following' rows='3' placeholder='elonmusk lexfridman ProfFeynman'>
              {followingText}
            </textarea>
            <small id='followingListHelp' class='form-text text-muted'>You can always change this later on, no worries.</small>
          </div>
        </div>
        <div class='col-sm-12 p-0'>
          <button disabled={loadingSetup} class='btn btn-md btn-primary'>{loadingSetup ? 'Working...' : (props.user.setupComplete ? 'Update' : 'Complete setup')}</button>
          {loadingSetup ? <div>Preparing your timeline, one moment please</div> : null}
        </div>
      </form>
    )
  }
}
export default Setup
