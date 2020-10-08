import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'
import { login, logout, isLoggedIn } from './../../auth-service'

const Header = (props) => (
  <header class=''>
    <nav class='navbar navbar-expand-lg navbar-white bg-white fixed-top'>
      <div class='container'>
        <a class="navbar-brand text-dark font-weight-bold" href="/" style="font-size: 2.1rem;">
          <img class="" src="/img/decent.black.svg" alt="" style="height: 5rem; margin-right: 0.5em;">
          Decent
        </a>
        <a class='navbar-brand' href='/'>Decent</a>
        <div class='navbar-nav'>
          {props.user && props.user.picture && <img src={props.user.picture} style='height: 2.5em; border-radius: 50%;' />}
          <span onClick={isLoggedIn() ? logout : login} class='nav-link btn' href='/'>{isLoggedIn() ? 'Logout' : 'Login'}</span>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
