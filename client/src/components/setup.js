import { h, Component } from 'preact'
import { updateUserSettings } from '../api-service'

class Setup extends Component {
  constructor () {
    super()
    this.state = {
      settings: {
        twitterHandle: '@elonmusk',
        following: []
      }
    }
  }

  handleSubmitSetup (event) {
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
      console.log('settings with options', options)
      return updateUserSettings(options)
        .then(settings => {
          console.log('updated settings', settings)
          this.setState({ settings })
          window.location.reload()
        })
        .catch(err => {
          console.error(err)
          this.setState({  })
          setTimeout(() => this.setState({  }), 1500)
        })
    }
  }

  render (props) {
    console.log('setup props.user', props.user)
    console.log('setup this.state', this.state)

    let settings = {}
    if (this.state.settings) settings = this.state.settings
    if (props.user && props.user.settings) settings = props.user.settings
    const followingText = settings.following ? settings.following.map(t => `@${t}`).join(' ') : ''

    return (
      <form onSubmit={e => this.handleSubmitSetup(e)}>
        <div class='row'>
          <div class='col-lg-6 form-group mb-5'>
            <label for='twitterHandle' class='col-form-label'>
              <b>Enter your Twitter handle</b><br />Retrieve the current users you follow
            </label>&nbsp;
            <div class=''>
              <input type='text' class='form-control' placeholder={settings.twitterHandle} id='twitterHandle' aria-describedby='twitterHandleHelp' />
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
}
export default Setup
