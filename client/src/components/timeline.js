import { h } from 'preact'
import timelineStyles from './timeline.css'
import Tweet from './tweet'
import VirtualList from 'react-tiny-virtual-list'

const Timeline = (props) => {
  const timeline = (props.timeline || [])
    .filter(t => props.retweets ? true : !t.retweet)
    .filter(t => props.replies ? true : !t.reply)

  return (
    <div class={timelineStyles.timeline}>
      <div class='col-lg-6 col-md-12 p-0 mx-auto overflow-hidden'>
        <VirtualList
          width='100%'
          height='97vh'
          itemCount={timeline.length}
          itemSize={(i => {
            const item = timeline[i]
            const text = item.formatted || item.text || '\n'
            const newLinesCount = text.split('\n').length
            return 200 + newLinesCount * 15 + text.length * 0.3
          })}
          scrollToAlignment='center'
          overscanCount={10}
          renderItem={({ index, style, t = timeline[index] }) =>
            <Tweet id={`t${+new Date(t.date)}`} tweet={timeline[index]} tabIndex={index + 2} key={index} style={style} />}
        />
      </div>
    </div>
  )
}

export default Timeline
