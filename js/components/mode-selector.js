import { readStorage, writeStorage } from '../storage.js'

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
      } else if (card.matches('[role="radio"]')) {
        card.setAttribute('aria-checked', String(selected))
        card.tabIndex = selected ? 0 : -1
      }
    }

    writeStorage('towerDefender.home.lastMode', mode)
    writeStorage('towerDefender.lastTheme', mode)
    document.dispatchEvent(new CustomEvent('tower:defender:modechange', { detail: { mode } }))
  }

  const modeCards = cards.filter((card) => card.matches('[role="radio"]'))

  for (const card of cards) {
    card.addEventListener('click', () => selectMode(card.dataset.mode))
    card.addEventListener('keydown', (event) => {
      if (!card.matches('[role="radio"]')) return

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1
        const currentIndex = modeCards.indexOf(card)
        const nextCard = modeCards[(currentIndex + direction + modeCards.length) % modeCards.length]
        selectMode(nextCard.dataset.mode)
        nextCard.focus()
        return
      }

      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      selectMode(card.dataset.mode)
    })
  }

  const savedHomeMode = readStorage('towerDefender.home.lastMode')
  const savedGameMode = readStorage('towerDefender.lastTheme')
  const initialMode = validModes.has(savedHomeMode)
    ? savedHomeMode
    : validModes.has(savedGameMode)
      ? savedGameMode
      : 'futuristic'

  selectMode(initialMode)
  return selectMode
}
