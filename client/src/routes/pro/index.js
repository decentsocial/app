import { h } from 'preact'
import useStore from '../../store'

const Pro = (props) => {
  if (!props.user) return null
  const state = useStore.getState()

  return (
    <div class='container mt-5 py-5'>
      <h1 class='title'>Pro</h1>
      {props.user.pro
        ? <p>You're already PRO! 💥</p>
        : <a class='btn btn-danger' onClick={state.stripeCheckout}>Become PRO for 2.99$ / month</a>}
    </div>
  )
}

export default Pro
