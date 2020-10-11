import { h } from 'preact'
import { updateUserSettings } from '../api-service'

const events = {
  handleSubmitSetup: (event) => {
    event.preventDefault()

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
      return updateUserSettings(options)
        .then(settings => {
          console.log('updated settings', settings)
          window.location.reload()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}

const Setup = (props) => {
  console.log('header props.user', props.user)
  const followingText = (props.user && props.user.settings && props.user.settings.following) ? props.user.settings.following.map(t => `@${t}`).join(' ') : ''
  return (
    <form onSubmit={events.handleSubmitSetup}>
      <div class='row'>
        <div class='col-lg-6 form-group mb-5'>
          <label for='twitterHandle' class='col-form-label'>
            <b>Enter your Twitter handle</b><br />Retrieve the current users you follow
          </label>&nbsp;
          <div class=''>
            <input type='text' class='form-control' placeholder={(props.user && props.user.settings && props.user.settings.twitterHandle) || '@elonmusk'} id='twitterHandle' aria-describedby='twitterHandleHelp' />
            <small id='twitterHandleHelp' class='form-text text-muted'>We'll never share your Twitter handle with anyone else.</small>
          </div>
        </div>
        <div class='col-lg-6 form-group mb-5'>
          <p class='lead mt-3'>If you prefer, enter below the users you want to follow</p>
          <textarea class='form-control' id='following' rows='3'>
            {followingText}
          </textarea>
          <small id='followingListHelp' class='form-text text-muted'>You can always change this later on, no worries.</small>
        </div>
      </div>
      <div class='col-sm-12 p-0'>
        <button class='btn btn-md btn-primary'>Complete setup</button>
      </div>
    </form>
  )
}

export default Setup
