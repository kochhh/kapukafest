(function() {
  let vh = window.innerHeight * .01
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * .01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })

  window.addEventListener('load', () => {
    document.querySelector('main').className = 'is-shown'
  })
})()
