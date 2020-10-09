import { h } from 'preact'
import alertStyles from './alert.css'

const Alert = (props) => {
  console.log('render alert', props)
  return (
    <div class={alertStyles.alert}>{props.alert}</div>
  )
}

export default Alert
