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
          {props.user && props.user.picture && <img src={props.user.picture} style='height: 2.5em; border-radius: 50%;' />}
          <span onClick={isLoggedIn() ? logout : login} class='nav-link' href='/'>{isLoggedIn() ? 'Logout' : 'Login'}</span>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
