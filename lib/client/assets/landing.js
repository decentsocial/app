window.$.fn.isOnScreen = function () {
  var win = window.$(window)

  var viewport = {
    top: win.scrollTop(),
    left: win.scrollLeft()
  }
  viewport.right = viewport.left + win.width()
  viewport.bottom = viewport.top + win.height()

  var bounds = this.offset()
  bounds.right = bounds.left + this.outerWidth()
  bounds.bottom = bounds.top + this.outerHeight()

  return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom))
}

const $demo = document.querySelector('#demo')

let lastCheck = Date.now()
let demoStarted = false
const once = {
  SCROLLED_PAGE: false,
  SAW_DEMO: false,
  SAW_DESCRIPTION: false,
  SAW_HOW_IT_WORKS: false,
  SAW_PRICING: false
}

window.$(document).ready(function () {
  window.$('[name="mc-embedded-subscribe-form"]').on('submit', function () {
    console.log('submitted form')
    window.plausible && window.plausible('Mailinglist')
  })

  window.$(window).scroll(function () {
    if (!once.SCROLLED_PAGE) {
      once.SCROLLED_PAGE = true
      window.plausible && window.plausible('scrolled page')
    }
    if (!once.SAW_DEMO && window.$('#demo').isOnScreen()) {
      once.SAW_DEMO = true
      window.plausible && window.plausible('saw demo')
    }
    if (!once.SAW_DESCRIPTION && window.$('#description').isOnScreen()) {
      once.SAW_DESCRIPTION = true
      window.plausible && window.plausible('saw description')
    }
    if (!once.SAW_HOW_IT_WORKS && window.$('#how-it-works').isOnScreen()) {
      once.SAW_HOW_IT_WORKS = true
      window.plausible && window.plausible('saw how-it-works')
    }
    if (!once.SAW_PRICING && window.$('#pricing').isOnScreen()) {
      once.SAW_PRICING = true
      window.plausible && window.plausible('saw pricing')
    }
  })

  document.addEventListener('scroll', registerScrolling, { capture: false, passive: true })

  const scrollIntervalHandle = setInterval(() => {
    if (!demoStarted && lastCheck > Date.now() - 500 && isScrolledIntoView($demo)) {
      demoStarted = true
      startDemo()
      clearInterval(scrollIntervalHandle)
    }
  }, 100)
})

function registerScrolling () { lastCheck = Date.now() }

async function startDemo () {
  console.log('starting demo')
  const $titleInput = $demo.querySelector('#demo-title-input')
  const $titleRendered = $demo.querySelector('#demo-title-rendered')
  const $imageInput = $demo.querySelector('#demo-image-input')
  const $descriptionInput = $demo.querySelector('#demo-description-input')
  const $descriptionRendered = $demo.querySelector('#demo-description-rendered')
  const $demoImage1 = $demo.querySelector('#demo-image-1')

  $titleInput.value = ''
  $titleRendered.innerHTML = ''
  $descriptionInput.innerText = ''
  $descriptionRendered.innerHTML = ''
  $imageInput.value = ''
  $demoImage1.setAttribute('hidden', true)
  $demoImage1.classList.remove('fade-in')

  const initialTitle = 'Apple Macbook Air 2017 13.3" Core i5 8GB Ram 256GB SSD'
  const initialDescription = 'This Macbook Air is refurbished to highest standards (Grade A or similar) and will perform as new.\n\nSuperb Performance & Stunning Apple Macbook Air A1466 2017 (64 Bit).\n.....'

  for (const char of initialTitle) {
    $titleInput.value += char
    $titleRendered.innerHTML += char
    await new Promise((resolve, reject) => setTimeout(resolve, 25))
  }
  for (const char of 'drive.goo.../macbook-air.png') {
    $imageInput.value += char
    await new Promise((resolve, reject) => setTimeout(resolve, 25))
  }
  $demoImage1.removeAttribute('hidden')
  $demoImage1.classList.add('fade-in')
  for (const char of initialDescription) {
    $descriptionInput.innerHTML += char // char === '\n' ? '<br>' : char
    $descriptionRendered.innerHTML += char
    await new Promise((resolve, reject) => setTimeout(resolve, 20))
  }
  await new Promise((resolve, reject) => setTimeout(resolve, 3000))
  startDemo()
}

function isScrolledIntoView (el) {
  if (!el) return
  var rect = el.getBoundingClientRect()
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  )
}
