import { h } from 'preact'
import { updateUserSettings } from '../api-service'

const events = {
  handleSubmitSetup: (event) => {
    event.preventDefault()

    let twitterHandle = event.target.querySelector('#twitterHandle').value
    let followingList = event.target.querySelector('#followingList').value
    twitterHandle = twitterHandle.replace('@', '')
    followingList = followingList.replace(/@/gi, '').split(' ').filter(Boolean)
    console.log('twitterHandle', twitterHandle)
    console.log('followingList', followingList)
    if (twitterHandle) {
      return updateUserSettings({ twitterHandle })
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
          <textarea class='form-control' id='followingList' rows='1'>
        @elonmusk
        @lexfridman
        @MKBHD
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
