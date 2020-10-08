import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'
// import { useAuth0 } from '@auth0/auth0-react'

const Home = (props) => {
  // const { loginWithRedirect } = useAuth0()
  return (
    <div class='container py-5'>
      <h1 class='title mb-5'>Welcome to Decent</h1>
      <p class="lead">
        <pre>{JSON.stringify(props.user, null, 2)}</pre>
      </p>
    </div>
  )
}

export default Home
