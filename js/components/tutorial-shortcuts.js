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

  const close = () => {
    modal.hidden = true
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
    if (event.key === 'Escape') close()
  })
}
