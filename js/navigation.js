export function initNavigation() {
  const toggle = document.querySelector('.mobile-toggle')
  const navigation = document.querySelector('#main-navigation')
  const topbar = document.querySelector('.topbar')

  if (!toggle || !navigation || !topbar) return

  const compactViewport = window.matchMedia('(max-width: 1000px)')
  let lastScrollY = window.scrollY
  let scrollTicking = false

  const setOpen = (open) => {
    navigation.classList.toggle('open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
    toggle.querySelector('.menu-icon')?.classList.toggle('is-open', open)
    if (open) topbar.classList.remove('is-hidden')
  }

  const updateTopbar = () => {
    if (!compactViewport.matches) {
      topbar.classList.remove('is-scrolled', 'is-hidden')
      lastScrollY = window.scrollY
      return
    }

    const currentScrollY = window.scrollY
    const pastHeroStart = currentScrollY > 28
    const scrollDifference = currentScrollY - lastScrollY
    const menuOpen = toggle.getAttribute('aria-expanded') === 'true'

    topbar.classList.toggle('is-scrolled', pastHeroStart)

    if (currentScrollY <= 28 || menuOpen) {
      topbar.classList.remove('is-hidden')
    } else if (scrollDifference > 8) {
      topbar.classList.add('is-hidden')
    } else if (scrollDifference < -8) {
      topbar.classList.remove('is-hidden')
    }

    lastScrollY = currentScrollY
  }

  const handleTopbarScroll = () => {
    if (scrollTicking) return
    scrollTicking = true
    window.requestAnimationFrame(() => {
      updateTopbar()
      scrollTicking = false
    })
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false)
  })

  document.addEventListener('click', (event) => {
    if (toggle.contains(event.target) || navigation.contains(event.target)) return
    if (toggle.getAttribute('aria-expanded') === 'true') setOpen(false)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return
    setOpen(false)
    toggle.focus()
  })

  window.addEventListener('scroll', handleTopbarScroll, { passive: true })
  window.addEventListener('resize', updateTopbar)
  compactViewport.addEventListener('change', updateTopbar)
  updateTopbar()
}
