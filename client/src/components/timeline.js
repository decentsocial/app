import { h } from 'preact'
import { useState } from 'preact/hooks'
import timelineStyles from './timeline.css'
import VirtualList from 'react-tiny-virtual-list'
import Linkify from 'react-linkify'

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
            <div id={`t${+new Date(t.date)}`} tabIndex={index + 2} key={index} style={style} class={timelineStyles.tweet + ' p-0 border-0 py-5'}>
              <div class=''>
                <small class='float-right text-muted has-tooltip'><a href={t.link} tabIndex={-1} target='_blank' rel='noopener noreferrer'>{new Date(t.date).toISOString().substring(0, 16)}</a></small>
                <h5 class='mb-1 text-muted text-left'>
                  <div style={`display: inline-block; border-radius: 50%; margin-right: 2em; height: 2em; width: 2em; vertical-align: middle; background-size: contain; background-image: url(${t.authorAvatar})`} />
                  {t.author}
                </h5>
                <span class='tooltip blue'><p>{t.date}</p></span>
              </div>
              <p class='w-100 mb-1 text-left py-2'>
                <Linkify>{t.formatted || t.text}</Linkify>
              </p>
            </div>}
        />
      </div>
    </div>
  )
}

export default Timeline
