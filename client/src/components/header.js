import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router'
import { login, logout } from '../auth-service'
import styles from './header.css'

class Header extends Component {
  render (props) {
    const [closed, setClosed] = useState(true)
    console.log('header', { closed }, props.user, styles)
    return (
      <header>
        <nav class={'navbar navbar-white bg-white static-top fixed-top ' + `${styles.nav} ${closed ? styles.notVisible : styles.visible}`}>
          <div class='container'>
            <a class='navbar-brand bg-white p-2 text-dark font-weight-bold' href='/' style='font-size: 2.1rem;'>
              <img class='' src='/assets/icons/favicon-32x32.png' alt='' style='height: 2rem; margin-right: 0.5em;' />
            </a>
            <div class='bg-white p-2'>
              {props.user && props.user.picture && <Link href='/settings'><img src={props.user.picture} class='px-3' style='height: 2.5em; border-radius: 50%;' /></Link>}
              <a href='#' onClick={props.user ? logout : login} class='btn btn-sm'>{props.user ? 'Logout' : 'Login'}</a>
            </div>
          </div>
        </nav>
        <button tabIndex={0} style='z-index: 9999;' class={styles.toggle + ' btn btn-sm'} onClick={() => setClosed(closed => !closed)}>
          {/* <svg width='1.5em' height='1.5em' viewBox='0 0 16 16' class='bi bi-layers' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path fill-rule='evenodd' d='M3.188 8L.264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l-1.063.567L14.438 10 8 13.433 1.562 10 4.25 8.567 3.187 8z' />
            <path fill-rule='evenodd' d='M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4zM1.563 6L8 9.433 14.438 6 8 2.567 1.562 6z' />
          </svg> */}
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
