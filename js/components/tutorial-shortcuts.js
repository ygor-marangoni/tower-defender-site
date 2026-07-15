export function initTutorialShortcuts() {
  const modal = document.querySelector('[data-shortcuts-modal]')
  const dialog = document.querySelector('#shortcuts-dialog')
  const opener = document.querySelector('[data-shortcuts-open]')
  const closeButtons = [...document.querySelectorAll('[data-shortcuts-close]')]
  if (!modal || !dialog || !opener) return

  let previousFocus
  let initialScrollY = 0
  let initialBodyScrollPosition = ''
  let initialScrollbarWidth = ''
  let initialDocumentScrollBehavior = ''
  const pageRegions = [...document.querySelectorAll('.topbar, main, footer, .floating-bottom-nav')]
  const previousInertStates = new Map()

  const setPageInert = (inert) => {
    for (const region of pageRegions) {
      if (inert) {
        previousInertStates.set(region, region.inert)
        region.inert = true
      } else {
        region.inert = previousInertStates.get(region) ?? false
      }
    }

    if (!inert) previousInertStates.clear()
  }

  const close = () => {
    modal.hidden = true
    opener.setAttribute('aria-expanded', 'false')
    setPageInert(false)
    document.body.classList.remove('shortcuts-modal-open')
    document.body.style.setProperty('--shortcuts-page-scroll', initialBodyScrollPosition)
    modal.style.setProperty('--shortcuts-scrollbar-width', initialScrollbarWidth)
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, initialScrollY)
    previousFocus?.focus({ preventScroll: true })
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = initialDocumentScrollBehavior
    })
  }

  const open = () => {
    previousFocus = document.activeElement
    initialScrollY = window.scrollY
    initialBodyScrollPosition = document.body.style.getPropertyValue('--shortcuts-page-scroll')
    initialScrollbarWidth = modal.style.getPropertyValue('--shortcuts-scrollbar-width')
    initialDocumentScrollBehavior = document.documentElement.style.scrollBehavior
    modal.style.setProperty('--shortcuts-scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`)
    document.body.style.setProperty('--shortcuts-page-scroll', `${initialScrollY}px`)
    modal.hidden = false
    opener.setAttribute('aria-expanded', 'true')
    setPageInert(true)
    document.body.classList.add('shortcuts-modal-open')
    dialog.focus()
  }

  opener.addEventListener('click', open)
  closeButtons.forEach((button) => button.addEventListener('click', close))
  document.addEventListener('wheel', (event) => {
    if (modal.hidden) return

    const scrollAmount = event.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? event.deltaY * 16
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? event.deltaY * window.innerHeight
        : event.deltaY

    event.preventDefault()
    modal.scrollBy({ top: scrollAmount, behavior: 'auto' })
  }, { passive: false })
  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return
    if (event.key === 'Escape') {
      close()
      return
    }

    if (event.key !== 'Tab') return
    const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    if (focusable.length === 0) {
      event.preventDefault()
      dialog.focus()
      return
    }

    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  })
}
