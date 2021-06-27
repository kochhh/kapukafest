import emailjs from 'emailjs-com'

const GetActualVh = {
  init() {
    let vh = window.innerHeight * .01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * .01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  }
}

const SmmoothScroll = {
  init() {
    const scrollBehaviorSupported = 'scroll-behavior' in document.documentElement.style
    if (scrollBehaviorSupported) return

    const easeOutCubic = t => --t * t * t + 1

    const scrollTo = (yPos, duration = 500) => {
      const startY = window.scrollY
      const difference = yPos - startY
      const startTime = performance.now()

      const step = () => {
        const progress = (performance.now() - startTime) / duration
        const amount = easeOutCubic(progress)
        window.scrollTo({ top: startY + amount * difference })
        if (progress < .999) {
          window.requestAnimationFrame(step)
        }
      }
      step()
    }

    [].slice.call(document.querySelectorAll('.link-anchor')).forEach(link => {
      link.addEventListener('click', evt => {
        if (window.location.hash) {
          const hash = evt.target.closest('a').getAttribute('href').split('#')[1]
          const scrollTargetPosition = document.getElementById(hash).offsetTop
          scrollTo(scrollTargetPosition)
        }
      })
    })
  }
}

const Animations = {
  init() {
    setTimeout(() => {
      const intro = document.querySelector('.intro')
      if (!intro) return
      document.querySelector('.intro').classList.add('is-shown')
    }, 150)
  }
}

const Parallaxx = {
  init() {
    const scene = document.getElementById('scene')
    if (!scene) return
    scene.addEventListener('mousemove', parallax)
    function parallax(evt) {
      [].slice.call(scene.querySelectorAll('img')).forEach(item => {
        const speed = item.getAttribute('data-speed') || 0
        const x = (window.innerWidth - evt.pageX * speed) / 200
        const y = (window.innerWidth - evt.pageY * speed) / 200
        item.style.transform = `translateX(${x}px) translateY(${y}px)`
      })
    }
  }
}

const EmailJs = {
  init() {
    const form = document.getElementById('register')
    if (!form) return
    form.addEventListener('submit', (evt) => {
      const button = evt.target.querySelector('button[type="submit"]')
      const label = button.querySelector('.submit-label')
      const loading = button.querySelector('.submit-loading')
      const icon = button.querySelector('.submit-icon')
      const success = evt.target.querySelector('.alert-success')
      const error = evt.target.querySelector('.alert-error')

      evt.preventDefault()

      const buttonBefore = () => {
        button.setAttribute('disabled', true)
        label.classList.add('hidden')
        loading.classList.remove('hidden')
        icon.classList.remove('hidden')
      }

      const buttonAfter = () => {
        button.removeAttribute('disabled')
        label.classList.remove('hidden')
        loading.classList.add('hidden')
        icon.classList.add('hidden')
      }

      const alertAction = (el) => {
        el.classList.remove('hidden')
        el.setAttribute('aria-hidden', false)
        setTimeout(() => {
          el.classList.add('hidden')
          el.setAttribute('aria-hidden', true)
        }, 10000)
      }

      const formClear = () => {
        evt.target.reset()
      }

      buttonBefore()
      emailjs.sendForm('service_bbd0avn', 'template_eq8mxae', evt.target, 'user_zJwztgGwINLHuIaEBLa44')
      // emailjs.sendForm('service_e9mtg6c', 'template_2iz1mfn', evt.target, 'user_gKnCkib0s79NdDgNfEnAo') // test
        .then(() => {
          buttonAfter()
          alertAction(success)
          formClear()
        }, () => {
          buttonAfter()
          alertAction(error)
        })
    })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  GetActualVh.init()
  SmmoothScroll.init()
  Parallaxx.init()
  EmailJs.init()
})

window.addEventListener('load', () => {
  Animations.init()
})
