import { h } from 'preact'
import { Link } from 'preact-router/match'

const Home = (props) => {
  // const { loginWithRedirect } = useAuth0()
  return (
    <div class='container py-5'>
      <h1 class='title mb-5'>Welcome to Decent</h1>
      <p><a class='btn btn-primary btn-sm' href='/login'>Log In</a> and enjoy a decent Twitter reading experience</p>
      {props.user && (
        <p class='lead'>
          <pre>{JSON.stringify(props.user, null, 2)}</pre>
        </p>
      )}
    </div>
  )
}

export default Home
