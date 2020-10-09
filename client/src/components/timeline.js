import { h } from 'preact'
import { useState } from 'preact/hooks'

const Timeline = (props) => {
  console.log('timeline props.user', props.user)
  const [retweets, setRetweets] = useState(false)
  const [replies, setReplies] = useState(false)
  return (
    <div class='row'>
      <div class='col-lg-12 mx-auto my-5'>
        <div class='form-group my-5'>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' value='' id='retweets' onInput={() => setRetweets(!retweets)} />
            <label class='form-check-label' for='retweets'>
            Show Retweets
            </label>
          </div>
          <div class='form-check'>
            <input class='form-check-input' type='checkbox' value='' id='replies' onInput={() => setReplies(!replies)} />
            <label class='form-check-label' for='replies'>
            Show Replies
            </label>
          </div>
        </div>
        <div class='row'>
          <div class='col-lg-6 mx-auto'>
            <ul class='list-group border-0 mt-5'>
              {(props.timeline || [])
                .filter(t => retweets ? true : !t.retweet)
                .filter(t => replies ? true : !t.reply)
                .map(t =>
                // <a key={t.link} target='_blank' rel='noopener noreferrer' href={t.link} class='list-group-item list-group-item-action py-2'>
                // </a>
                  <li key={t.link} class='list-group-item list-group-item-action1 border-0 py-5'>
                    <div class='d-flex w-100 py-4 justify-content-between'>
                      <h5 class='mb-1'>
                        <div style={`display: inline-block; border-radius: 50%; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-image: url(${t.authorAvatar})`} />
                        &nbsp;&nbsp;&nbsp;&nbsp;{t.author}
                      </h5>
                      <small class='text-muted'><a href={t.link} target='_blank' rel='noopener noreferrer'>{t.date}</a></small>
                    </div>
                    <p class='mb-1 text-left py-2'>{t.text}</p>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline
