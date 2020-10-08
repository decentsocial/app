import { h } from 'preact'
import { login } from '../../auth-service'
import Setup from '../../components/setup'


const Home = (props) => {
  console.log('window.location.hash', window.location.hash)
  if (window.location.hash) {
    return (
      <div class='container'>
        <h1 class='title'>Logging you in...</h1>
      </div>
    )
  }
  return (
    <div class='container py-5'>
      {/* {(!props.user || (props.user && props.user.setupComplete)) &&
        <h1 class='title mb-5'>Welcome to Decent</h1>} */}
      {!props.user &&
        <p><a href='#' onClick={login} class='btn btn-primary btn-sm'>Login</a> and enjoy a decent Twitter reading experience</p>}
      {props.user && !props.user.setupComplete && <Setup user={props.user} />}
      {props.user && props.user.setupComplete && (
        <div class='py-5'>
          <h1 class='title'>{props.user.nickname},<br />you are all set</h1>
        </div>
      )}
    </div>
  )
}

export default Home
