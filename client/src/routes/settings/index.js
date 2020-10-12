import { h } from 'preact'
import Setup from '../../components/setup'
import TimelineSettings from '../../components/timeline-settings'

const Settings = (props) => {
  return (
    <div class='container mt-5 py-5'>
      <h1 class='title'>Settings</h1>
      <Setup class='my-5' user={props.user} />
      <TimelineSettings class='my-5' user={props.user} />
    </div>
  )
}

export default Settings
