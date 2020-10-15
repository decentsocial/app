import { h } from 'preact'
import { Link } from 'preact-router'
import timelineStyles from './timeline.css'
import { Virtuoso } from 'react-virtuoso'

const Timeline = (props) => {
  const timeline = (props.timeline || [])
    .filter(t => props.retweets ? true : !t.retweet)
    .filter(t => props.replies ? true : !t.reply)

  return <Virtuoso
    class={timelineStyles.timeline + ' col-lg-6 col-md-12 mx-auto p-0'}
    style={{ width: '100%', height: '100vh' }}
    totalCount={timeline.length}
    item={index => {
      const t = timeline[index]
      return <div id={`t${+new Date(t.date)}`} tabIndex={index + 2} key={index} class={timelineStyles.tweet + ' p-0 mx-auto border-0 py-5 text-decoration-none'}>
        <div class=''>
          <small class='float-right text-muted has-tooltip'><Link href={t.status} class='text-decoration-none'>{new Date(t.date).toISOString().substring(0, 16)}</Link></small>
          <h5 class='mb-1 text-muted text-left'>
            <div style={`display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-image: url(${t.authorAvatar})`} />
            {t.author}
          </h5>
          <span class='tooltip blue'><p>{t.date}</p></span>
        </div>
        <p class='w-100 mb-1 text-left py-3' dangerouslySetInnerHTML={{ __html: t.html }} />
      </div>
    }}
  />
}

export default Timeline
