export function setLocal (key, value) {
  window.localStorage.setItem(key, value)
}

export function getLocal (key) {
  return window.localStorage.getItem(key)
}

export function removeLocal (key) {
  window.localStorage.removeItem(key)
}
