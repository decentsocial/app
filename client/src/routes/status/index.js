import { h } from 'preact'
import timelineStyles from '../../components/timeline.css'

const Status = (props) => {
  const id = props.id
  console.log('Status, id', id)
  const t = props.timeline.find(t => t.link.includes(id))
  console.log('Status, t', t)
  if (!t) return null
  return (
    <div class='container mt-5 py-5'>
      <div class={timelineStyles.timeline + ' '}>
        <div class='p-0 mx-auto'>
          <div class={timelineStyles.tweet + ' mx-auto border-0 py-5 text-decoration-none'}>
            <div class=''>
              <small class='float-right text-muted has-tooltip'><a href={t.link} tabIndex={-1} target='_blank' rel='noopener noreferrer'>{new Date(t.date).toISOString().substring(0, 16)}</a></small>
              <h5 class='mb-1 text-muted text-left'>
                <div style={`display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-image: url(${t.authorAvatar})`} />
                {t.author}
              </h5>
              <span class='tooltip blue'><p>{t.date}</p></span>
            </div>
            <p class='w-100 mb-1 text-left py-3' dangerouslySetInnerHTML={{ __html: t.html }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Status
