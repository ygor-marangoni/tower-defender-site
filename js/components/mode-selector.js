const validModes = new Set(['futuristic', 'medieval'])

export function initModeSelector() {
  const shell = document.querySelector('.site-shell')
  const cards = [...document.querySelectorAll('[data-mode]')]

  const selectMode = (mode) => {
    if (!validModes.has(mode)) return

    shell?.classList.toggle('is-futuristic', mode === 'futuristic')
    shell?.classList.toggle('is-medieval', mode === 'medieval')

    for (const card of cards) {
      const selected = card.dataset.mode === mode
      card.classList.toggle('selected', selected)
      if (card.matches('button')) {
        card.setAttribute('aria-pressed', String(selected))
      } else if (selected) {
        card.setAttribute('aria-current', 'true')
      } else {
        card.removeAttribute('aria-current')
      }
    }

    localStorage.setItem('towerDefender.home.lastMode', mode)
    localStorage.setItem('towerDefender.lastTheme', mode)
    document.dispatchEvent(new CustomEvent('tower:defender:modechange', { detail: { mode } }))
  }

  for (const card of cards) {
    card.addEventListener('click', () => selectMode(card.dataset.mode))
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      selectMode(card.dataset.mode)
    })
  }

  const savedHomeMode = localStorage.getItem('towerDefender.home.lastMode')
  const savedGameMode = localStorage.getItem('towerDefender.lastTheme')
  const initialMode = validModes.has(savedHomeMode)
    ? savedHomeMode
    : validModes.has(savedGameMode)
      ? savedGameMode
      : 'futuristic'

  selectMode(initialMode)
  return selectMode
}
