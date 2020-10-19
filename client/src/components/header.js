import { h, Component } from 'preact'
import { Link } from 'preact-router'
import { login, logout } from '../auth-service'
import { trackEvent } from '../analytics'
import styles from './header.css'
import useStore from '../store'

function svgLoading () {
  return (
    <svg width='24' height='24' viewBox='0 0 16 16' class={`bi bi-arrow-repeat ${styles.rotate}`} fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
      <path d='M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z' />
      <path fill-rule='evenodd' d='M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z' />
    </svg>
  )
}

function svgMenu () {
  return (
    <svg viewBox='0 0 60 60' width='24' height='24'>
      <rect width='100' height='5' />
      <rect y='20' width='100' height='5' />
      <rect y='40' width='100' height='5' />
    </svg>
  )
}

class Header extends Component {
  render (props) {
    const state = useStore.getState()
    const closed = state.headerClosed
    return (
      <header>
        <nav class={'navbar navbar-white bg-white static-top fixed-top ' + `${styles.nav} ${closed ? styles.notVisible : styles.visible}`}>
          <div class='container'>
            <a class='navbar-brand bg-white p-2 text-dark font-weight-bold' href='/' style='font-size: 2.1rem;' onClick={() => state.toggleHeaderClosed()}>
              <img class='' src='/assets/icons/favicon-32x32.png' alt='' style='height: 2rem; margin-right: 0.5em;' />
            </a>
            <div class='bg-white p-2'>
              {props.user && props.user.picture && <Link href='/settings' onClick={() => { trackEvent((closed ? 'opened' : 'closed') + '-profile') }}><img src={props.user.picture} class='px-3' style='height: 2.5em; border-radius: 50%;' /></Link>}
              <a href='#' onClick={() => { props.user ? logout() : login() }} class='btn btn-sm'>{props.user ? 'Logout' : 'Login'}</a>
            </div>
          </div>
        </nav>
        <button tabIndex={0} style='z-index: 9999;' class={styles.toggle + ' btn btn-sm bg-white rounded'} onClick={() => state.toggleHeaderClosed()}>
          {props.icon ? props.icon : (props.loading ? svgLoading() : svgMenu())}
        </button>
      </header>
    )
  }
}

export default Header
