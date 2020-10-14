import { h } from 'preact'
import alertStyles from './alert.css'

const Alert = (props) => {
  if (!props.alert) return null
  // if (Array.isArray(props.alert) && props.alert.length === 0) return null
  // console.log('render alert', props)
  // if (Array.isArray(props.alert)) return props.alert.map(a => <div key={a} class={alertStyles.alert}></div>)

  return (
    <div class={props.inline ? '' : alertStyles.alert}>
      {/* {props.inline ? null : <span class={alertStyles.rotate}>
        <svg class={alertStyles.icon} width='2em' height='2em' viewBox='0 0 16 16' class='bi bi-plus-circle' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
          <path fill-rule='evenodd' d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path fill-rule='evenodd' d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
        </svg>
      </span>} */}
      <div class={props.inline ? alertStyles.inline : alertStyles.text} dangerouslySetInnerHTML={{ __html: props.alert }} />
    </div>
  )
}

export default Alert
