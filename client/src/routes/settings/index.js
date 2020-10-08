import { h } from 'preact'
import Setup from '../../components/setup'

const Settings = (props) => {
  return (
    <div class='container py-5'>
      <h1 class='title'>Settings</h1>
      <Setup class='mt-5' user={props.user} />
    </div>
  )
}

export default Settings
