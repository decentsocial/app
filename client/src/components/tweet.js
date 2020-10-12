import { h } from 'preact'
import tweetStyles from './tweet.css'
import Linkify from 'react-linkify'

const Tweet = (props) => {
  const tweet = props.tweet
  return (
    <div class={tweetStyles.tweet + ' p-0 border-0 py-5'}>
      <small class='float-right text-muted has-tooltip'><a href={tweet.link} tabIndex={-1} target='_blank' rel='noopener noreferrer'>{new Date(tweet.date).toISOString().substring(0, 16)}</a></small>
      <h5 class='mb-1 text-muted text-left'>
        <div style={`display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-image: url(${tweet.authorAvatar})`} />
        {tweet.author}
      </h5>
      <span class='tooltip blue'><p>{tweet.date}</p></span>
      <p class='lead mt-4 text-left py-2'><Linkify>{tweet.formatted || tweet.text}</Linkify></p>
    </div>
  )
}

export default Tweet
