import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'

const Home = () => (
  <div class='container py-5'>
    <h1 class='title mb-5'>Welcome to Decent</h1>
    <p><a href='/login' class='btn btn-primary btn-sm'>Sign in</a> and enjoy a decent Twitter reading experience</p>
  </div>
)

export default Home
