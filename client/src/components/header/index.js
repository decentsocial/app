import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'

const Header = () => (
  <header class=''>
    <nav class='navbar navbar-expand-lg navbar-light bg-light'>
      <div class='container'>
        <a class='navbar-brand' href='/'>Decent</a>
        <div class='navbar-nav'>
          {/* <Link activeClassName={style.active} class='nav-link' href='/'>App</Link> */}
        </div>
      </div>
    </nav>
  </header>
)

export default Header
