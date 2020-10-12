import { h } from 'preact'
import { useState } from 'preact/hooks'

function eyeClosedIcon () {
  return <svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-eye-slash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z' />
    <path d='M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z' />
    <path d='M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z' />
    <path fill-rule='evenodd' d='M13.646 14.354l-12-12 .708-.708 12 12-.708.708z' />
  </svg>
}
function eyeOpenIcon () {
  return <svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-eye' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path fill-rule='evenodd' d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z' />
    <path fill-rule='evenodd' d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z' />
  </svg>
}

const TimelineSettings = (props) => {
  const cachedRetweets = window.localStorage.getItem('retweets') === 'true'
  const cachedReplies = window.localStorage.getItem('replies') === 'true'
  const [retweets, setRetweets] = useState(cachedRetweets)
  const [replies, setReplies] = useState(cachedReplies)

  return (
    <div class='row mt-5'>
      <div class='col-md-12'>
        <h1 class='title mt-5'>Timeline</h1>
        <p class='lead mt-5'>Customize your timeline at your liking.</p>
      </div>
      <div class='col-md-6'>
        <div class=' form-group'>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' checked={retweets} id='retweets' onInput={() => { window.localStorage.setItem('retweets', `${!retweets}`); setRetweets(!retweets) }} />
            <label class='form-check-label' for='retweets'>
              {retweets ? 'Show Retweets' : 'Hide Retweets'}
              &nbsp;&nbsp;{retweets ? eyeOpenIcon() : eyeClosedIcon()}
            </label>
          </div>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' checked={replies} id='replies' onInput={() => { window.localStorage.setItem('replies', `${!replies}`); setReplies(!replies) }} />
            <label class='form-check-label' for='replies'>
              {replies ? 'Show Replies' : 'Hide Replies'}
              &nbsp;&nbsp;{replies ? eyeOpenIcon() : eyeClosedIcon()}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSettings
