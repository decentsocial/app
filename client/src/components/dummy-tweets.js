import timelineStyles from './timeline.css'

const DummyTweets = () => {
  return (
    <div class='user-select-none'>
      <div class=''>
        <div class={timelineStyles.tweet + ' border-0 py-5 mx-auto'}>
          <div class=''>
            <small class='float-right text-muted'>__:__AM</small>
            <h5 class='mb-1 text-muted text-left'>
              <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
            @____
            </h5>
          </div>
          <p class='w-100 mb-1 text-left py-3'>_________________________________________________<br />__________________________________________________________<br />________________<br />_____</p>
        </div>
        <div class={timelineStyles.tweet + ' border-0 py-5 mx-auto'}>
          <div class=''>
            <small class='float-right text-muted'>__:__AM</small>
            <h5 class='mb-1 text-muted text-left'>
              <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
            @_______
            </h5>
          </div>
          <p class='w-100 mb-1 text-left py-2'>__________________________________<br />______________<br /></p>
        </div>
        <div class={timelineStyles.tweet + ' border-0 py-5 mx-auto'}>
          <div class=''>
            <small class='float-right text-muted'>__:__PM</small>
            <h5 class='mb-1 text-muted text-left'>
              <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
            @______________
            </h5>
          </div>
          <p class='w-100 mb-1 text-left py-2'>_________________________________________<br />_____________________________________<br />____________________________<br />_____</p>
        </div>
        <div class={timelineStyles.tweet + ' border-0 py-5 mx-auto'}>
          <div class=''>
            <small class='float-right text-muted'>__:__PM</small>
            <h5 class='mb-1 text-muted text-left'>
              <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
            @_________
            </h5>
          </div>
          <p class='w-100 mb-1 text-left py-2'>_____________________________<br />______________________________________________________<br />________________<br />_________________________________________</p>
        </div>
      </div>
    </div>
  )
}

export default DummyTweets
