import { h } from 'preact'
import { Link } from 'preact-router/match'
import { login } from '../../auth-service'

const Home = (props) => {
  return (
    <div class='container py-5'>
      <h1 class='title mb-5'>Welcome to Decent</h1>
      {!props.user && <p><span onClick={login} class='btn btn-sm' href='/'>Login</span> and enjoy a decent Twitter reading experience</p>}
      {props.user && (
        <p class='lead'>
          <pre>{JSON.stringify(props.user, null, 2)}</pre>
        </p>
      )}
    </div>
  )
}

export default Home
