import { readStorage } from '../storage.js'

const modes = ['futuristic', 'medieval']

function readNumber(key) {
  const value = Number(readStorage(key, 0))
  return Number.isFinite(value) ? value : 0
}

function readRecords(mode) {
  const score = readNumber(`towerDefender.${mode}.bestScore`)
  const wave = readNumber(`towerDefender.${mode}.bestWave`)

  if (mode !== 'futuristic') return { score, wave }

  return {
    score: Math.max(score, readNumber('tower-defender.bestScore')),
    wave: Math.max(wave, readNumber('tower-defender.bestWave')),
  }
}

function formatScore(score) {
  return `${score.toLocaleString('pt-BR')} pts`
}

export function initRecords() {
  const refresh = (activeMode = 'futuristic') => {
    const records = Object.fromEntries(modes.map((mode) => [mode, readRecords(mode)]))

    for (const mode of modes) {
      const score = document.querySelector(`[data-record-score="${mode}"]`)
      const wave = document.querySelector(`[data-record-wave="${mode}"]`)
      const card = document.querySelector(`[data-record-mode="${mode}"]`)

      if (score) score.textContent = formatScore(records[mode].score)
      if (wave) wave.textContent = String(records[mode].wave)
      card?.classList.toggle('is-active', mode === activeMode)
    }

    const activeRecords = records[activeMode]
    const label = document.querySelector('[data-active-record-label]')
    const status = document.querySelector('[data-active-record-status]')

    if (label) label.textContent = activeMode === 'medieval' ? 'Medieval' : 'Futurista'
    if (status) {
      status.textContent = activeRecords.score || activeRecords.wave
        ? `${formatScore(activeRecords.score)} · maior ${activeMode === 'medieval' ? 'cerco' : 'onda'} ${activeRecords.wave}.`
        : 'Jogue sua primeira partida e inaugure o placar.'
    }
  }

  document.addEventListener('tower:defender:modechange', (event) => refresh(event.detail.mode))
  window.addEventListener('storage', () => {
    const activeMode = document.querySelector('.site-shell')?.classList.contains('is-medieval') ? 'medieval' : 'futuristic'
    refresh(activeMode)
  })

  refresh()
}
