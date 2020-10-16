import { h } from 'preact'
import { Link, route } from 'preact-router'
import timelineStyles from './timeline.css'
import { Virtuoso } from 'react-virtuoso'

const debouncedSave = debounce(({ startIndex } = {}) => {
  window.localStorage.setItem('lastTweetIndex', startIndex)
}, 1000)

let lastTweetIndex = +window.localStorage.getItem('lastTweetIndex')

const Timeline = (props) => {
  const timeline = (props.timeline || [])
    .filter(t => props.retweets ? true : !t.retweet)
    .filter(t => props.replies ? true : !t.reply)

  return (
    <Virtuoso
      style={{ width: '100%', height: '100vh' }}
      totalCount={timeline.length}
      overscan={1000}
      scrollSeek={{
        enter: velocity => Math.abs(velocity) > 1000,
        exit: velocity => {
          const shouldExit = Math.abs(velocity) < 200
          return shouldExit
        },
        change: (_velocity, { startIndex, endIndex }) => {},
        // You can use index to randomize
        // and make the placeholder list more organic.
        placeholder: ({ height, index }) => (
          <div class={timelineStyles.tweet + ' border-0 py-5 mx-auto'} style={{ height }}>
            <div class=''>
              <small class='float-right text-muted'>__:__AM</small>
              <h5 class='mb-1 text-muted text-left'>
                <div style='display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-color: lightgrey' />
            @____
              </h5>
            </div>
            <p class='w-100 mb-1 text-left py-3'>_________________________________________________<br />__________________________________________________________<br />________________<br />_____</p>
          </div>
        )
      }}
      rangeChanged={debouncedSave}
      initialTopMostItemIndex={lastTweetIndex}
      item={index => {
        const t = timeline[index]
        return (
          <div
            key={index} class={timelineStyles.tweet + ' mx-auto border-0 py-5 user-selection-none'} onDoubleClick={() => {
              window.localStorage.setItem('lastTweetIndex', index)
              lastTweetIndex = index
              route(t.status)
            }}
          >
            <div class=''>
              <small class='float-right text-muted'><Link href={t.status} class='text-decoration-none'>{new Date(t.date).toISOString().substring(0, 16)}</Link></small>
              <h5 class='mb-1 text-muted text-left'>
                <div style={`display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-image: url(${t.authorAvatar})`} />
                {t.author}
              </h5>
            </div>
            <p class='w-100 mb-1 text-left py-3' dangerouslySetInnerHTML={{ __html: t.html }} />
          </div>
        )
      }}
    />
  )
}

export default Timeline

function debounce (func, wait) {
  // https://davidwalsh.name/javascript-debounce-function
  var timeout
  return function () {
    var context = this; var args = arguments
    var later = function () {
      timeout = null
      func.apply(context, args)
    }
    var callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
};
