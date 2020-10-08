import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'
// import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  // const { loginWithRedirect } = useAuth0()
  return (
    <div class='container py-5'>
      <h1 class='title mb-5'>Welcome to Decent</h1>
      {/* <p><button class='btn btn-primary btn-sm' onClick={() => loginWithRedirect()}>Log In</button> and enjoy a decent Twitter reading experience</p> */}
    </div>
  )
}

export default Home
