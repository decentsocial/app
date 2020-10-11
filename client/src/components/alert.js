import { h } from 'preact'
import alertStyles from './alert.css'

const Alert = (props) => {
  if (!props.alert) return null
  console.log('render alert', props)
  if (Array.isArray(props.alert)) return props.alert.map(a => <div class={alertStyles.alert}>{a.alert}</div>)

  return (
    <div class={alertStyles.alert}>{props.alert}</div>
  )
}

export default Alert
