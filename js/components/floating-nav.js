export function initFloatingNavigation() {
  const navigation = document.querySelector('.floating-bottom-nav')
  const hero = document.querySelector('#inicio')
  const ranking = document.querySelector('#ranking')
  const links = [...document.querySelectorAll('[data-floating-nav-link]')]

  if (!navigation || !hero || links.length === 0) return

  const desktop = window.matchMedia('(min-width: 1001px)')
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)

  let heroPassed = false
  let rankingPassed = false
  let ticking = false

  const updateVisibility = () => {
    const visible = desktop.matches && heroPassed && !rankingPassed
    navigation.classList.toggle('is-visible', visible)
    navigation.setAttribute('aria-hidden', String(!visible))
    navigation.inert = !visible
  }

  const updateActiveLink = () => {
    const readingLine = window.scrollY + window.innerHeight * 0.36
    let activeSection = sections[0]

    for (const section of sections) {
      if (section.offsetTop <= readingLine) activeSection = section
    }

    for (const link of links) {
      const active = link.getAttribute('href') === `#${activeSection?.id}`
      link.classList.toggle('is-active', active)
      if (active) link.setAttribute('aria-current', 'page')
      else link.removeAttribute('aria-current')
    }
  }

  const updateFromScroll = () => {
    if (ticking) return
    ticking = true

    window.requestAnimationFrame(() => {
      if (!('IntersectionObserver' in window)) {
        heroPassed = hero.getBoundingClientRect().bottom <= 0
      }

      rankingPassed = ranking?.getBoundingClientRect().top <= -window.innerHeight * 0.3
      updateVisibility()

      updateActiveLink()
      ticking = false
    })
  }

  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0
      updateVisibility()
    })

    heroObserver.observe(hero)
  } else {
    heroPassed = hero.getBoundingClientRect().bottom <= 0
  }

  rankingPassed = ranking?.getBoundingClientRect().top <= -window.innerHeight * 0.3

  desktop.addEventListener('change', updateVisibility)
  window.addEventListener('scroll', updateFromScroll, { passive: true })
  window.addEventListener('resize', updateFromScroll, { passive: true })

  updateVisibility()
  updateActiveLink()
}
