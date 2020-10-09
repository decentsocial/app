import { h } from 'preact'

const Timeline = (props) => {
  console.log('timeline props.user', props.user)
  return (
    <div class='row'>
      <div class='col-lg-6 mx-auto my-5'>
        <ul class='list-group'>
          {(props.timeline || []).map(t =>
            <a key={t.link} target='_blank' href={t.link} class='list-group-item list-group-item-action py-2'>
              <div class='d-flex w-100 py-4 justify-content-between'>
                <h5 class='mb-1'>
                  <div style={`display: inline-block; border-radius: 50%; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-image: url(${t.authorAvatar})`} />
                    &nbsp;&nbsp;&nbsp;&nbsp;{t.author}
                </h5>
                <small class='text-muted'>{t.date}</small>
              </div>
              <p class='mb-1 text-left py-2'>{t.text}</p>
            </a>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Timeline
