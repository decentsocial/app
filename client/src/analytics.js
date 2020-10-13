export function trackEvent (name) {
  if (window.plausible) {
    window.plausible(name)
  }
}
