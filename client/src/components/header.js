import { h } from 'preact'
import { login, logout } from '../auth-service'

const Header = (props) => {
  console.log('header props.user', props.user)
  return (
    <header class=''>
      <nav class='navbar navbar-expand-lg navbar-white bg-white static-top1 fixed-top1'>
        <div class='container'>
          <a class='navbar-brand text-dark font-weight-bold' href='/' style='font-size: 2.1rem;'>
            <img class='' src='/assets/icons/favicon-32x32.png' alt='' style='height: 2rem; margin-right: 0.5em;' />
          </a>
          <div class='navbar-nav'>
            {props.user && props.user.picture && <img src={props.user.picture} class='px-3' style='height: 2.5em; border-radius: 50%;' />}
            <a href='#' onClick={props.user ? logout : login} class='nav-link btn btn-sm'>{props.user ? 'Logout' : 'Login'}</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header