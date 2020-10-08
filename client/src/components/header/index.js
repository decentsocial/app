import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'
import { login, logout, isLoggedIn } from './../../auth-service'

const Header = (props) => (
  <header class=''>
    <nav class='navbar navbar-expand-lg navbar-light bg-light'>
      <div class='container'>
        <a class='navbar-brand' href='/'>Decent</a>
        <div class='navbar-nav'>
          <Link onClick={isLoggedIn() ? logout : login} class='nav-link' href='/'>{isLoggedIn() ? 'Logout' : 'Login'}</Link>
        </div>
        <small>{props.user && <div>{props.user.sub}</div>}</small>
      </div>
    </nav>
  </header>
)

export default Header
