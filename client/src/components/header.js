import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router'
import { login, logout } from '../auth-service'
import { trackEvent } from '../analytics'
import styles from './header.css'

class Header extends Component {
  render (props) {
    const [closed, setClosed] = useState(true)
    return (
      <header>
        <nav class={'navbar navbar-white bg-white static-top fixed-top ' + `${styles.nav} ${closed ? styles.notVisible : styles.visible}`}>
          <div class='container'>
            <a class='navbar-brand bg-white p-2 text-dark font-weight-bold' href='/' style='font-size: 2.1rem;' onClick={() => setClosed(closed => !closed)}>
              <img class='' src='/assets/icons/favicon-32x32.png' alt='' style='height: 2rem; margin-right: 0.5em;' />
            </a>
            <div class='bg-white p-2'>
              {props.user && props.user.picture && <Link href='/settings' onClick={() => { setClosed(closed => !closed); trackEvent((closed ? 'opened' : 'closed') + '-profile') }}><img src={props.user.picture} class='px-3' style='height: 2.5em; border-radius: 50%;' /></Link>}
              <a href='#' onClick={() => { props.user ? logout() : login() }} class='btn btn-sm'>{props.user ? 'Logout' : 'Login'}</a>
            </div>
          </div>
        </nav>
        <button tabIndex={0} style='z-index: 9999;' class={styles.toggle + ' btn btn-sm'} onClick={() => setClosed(closed => !closed)}>
          <svg viewBox='0 0 60 60' width='20' height='20'>
            <rect width='100' height='5' />
            <rect y='20' width='100' height='5' />
            <rect y='40' width='100' height='5' />
          </svg>
        </button>
      </header>
    )
  }
}

export default Header
