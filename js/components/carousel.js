import { getTowerAimOrigin, renderTowerPreview } from './tower-preview.js'

const archetypes = [
  {
    id: 'basic',
    archetype: 'Básica',
    role: 'Equilíbrio',
    damage: '20',
    range: '110',
    cooldown: '0,7s',
    cost: '50',
    roleCopy: 'Uma opção confiável para começar a partida, controlar a rota e evoluir sem comprometer todos os seus recursos.',
  },
  {
    id: 'rapid',
    archetype: 'Rápida',
    role: 'Velocidade',
    damage: '10',
    range: '95',
    cooldown: '0,3s',
    cost: '75',
    roleCopy: 'A maior cadência do arsenal. Ideal para enfraquecer enxames e eliminar unidades rápidas antes que avancem.',
  },
  {
    id: 'heavy',
    archetype: 'Pesada',
    role: 'Impacto',
    damage: '45',
    range: '140',
    cooldown: '1,2s',
    cost: '120',
    roleCopy: 'Alto dano e o maior alcance disponível. Custa mais, mas muda o rumo das ondas mais difíceis.',
  },
]

const themes = {
  futuristic: {
    money: 'Créditos',
    wave: 'Onda',
    defenses: {
      basic: { name: 'Canhão de Pulso', description: 'Precisão confiável para controlar a rota.' },
      rapid: { name: 'Torre Laser', description: 'Cadência extrema para eliminar enxames.' },
      heavy: { name: 'Lança Plasma', description: 'Impacto concentrado no maior alcance.' },
    },
  },
  medieval: {
    money: 'Ouro',
    wave: 'Cerco',
    defenses: {
      basic: { name: 'Torre de Arqueiro', description: 'Versátil para sustentar o primeiro cerco.' },
      rapid: { name: 'Besta', description: 'Disparos velozes contra avanços rápidos.' },
      heavy: { name: 'Canhão Real', description: 'Força bruta para deter as maiores ameaças.' },
    },
  },
}

export function initDefenseCarousel({ selectMode }) {
  let currentIndex = 0
  let currentMode = document.querySelector('.site-shell')?.classList.contains('is-medieval') ? 'medieval' : 'futuristic'
  const slide = document.querySelector('[data-defense-slide]')
  const defenseVisual = document.querySelector('.defense-visual')
  const towerPreview = document.querySelector('[data-defense-tower-preview]')
  const rangeRing = document.querySelector('.defense-range-ring')
  const dots = [...document.querySelectorAll('[data-defense-index]')]
  const defaultAimRotation = -0.25
  let aimRotation = defaultAimRotation
  let aimFrame

  const drawCurrentTower = () => {
    renderTowerPreview(towerPreview, {
      mode: currentMode,
      type: archetypes[currentIndex].id,
      rotation: aimRotation,
    })
  }

  const scheduleTowerDraw = () => {
    if (aimFrame) return
    aimFrame = window.requestAnimationFrame(() => {
      aimFrame = undefined
      drawCurrentTower()
    })
  }

  const fields = {
    counters: [...document.querySelectorAll('[data-defense-counter]')],
    name: document.querySelector('[data-defense-name]'),
    description: document.querySelector('[data-defense-description]'),
    roleCopy: document.querySelector('[data-defense-role-copy]'),
    damage: document.querySelector('[data-defense-damage]'),
    range: document.querySelector('[data-defense-range]'),
    cooldown: document.querySelector('[data-defense-cooldown]'),
    cost: document.querySelector('[data-defense-cost]'),
    costLabel: document.querySelector('[data-defense-cost-label]'),
    moneyLabel: document.querySelector('[data-defense-money-label]'),
    waveLabel: document.querySelector('[data-defense-wave-label]'),
  }

  const render = () => {
    const archetype = archetypes[currentIndex]
    const theme = themes[currentMode]
    const defense = theme.defenses[archetype.id]

    fields.counters.forEach((counter) => {
      counter.textContent = `0${currentIndex + 1} / 0${archetypes.length}`
    })
    fields.name.textContent = defense.name
    fields.description.textContent = defense.description
    fields.roleCopy.textContent = archetype.roleCopy
    fields.damage.textContent = archetype.damage
    fields.range.textContent = archetype.range
    fields.cooldown.textContent = archetype.cooldown
    fields.cost.textContent = archetype.cost
    fields.costLabel.textContent = theme.money
    fields.moneyLabel.textContent = theme.money.toUpperCase()
    fields.waveLabel.textContent = theme.wave.toUpperCase()
    rangeRing?.style.setProperty('--defense-range-size', `${Math.round(Number(archetype.range) * 2.15)}px`)
    drawCurrentTower()

    dots.forEach((dot, index) => {
      const selected = index === currentIndex
      const item = archetypes[index]
      const itemName = theme.defenses[item.id].name
      dot.classList.toggle('active', selected)
      dot.setAttribute('aria-selected', String(selected))
      dot.setAttribute('aria-label', `Mostrar ${itemName}`)
    })

    slide.style.animation = 'none'
    void slide.offsetWidth
    slide.style.animation = ''
  }

  const change = (direction) => {
    currentIndex = (currentIndex + direction + archetypes.length) % archetypes.length
    render()
  }

  document.querySelectorAll('[data-defense-previous]').forEach((button) => {
    button.addEventListener('click', () => change(-1))
  })
  document.querySelectorAll('[data-defense-next]').forEach((button) => {
    button.addEventListener('click', () => change(1))
  })
  document.querySelector('[data-play-defense]')?.addEventListener('click', () => selectMode(currentMode))
  dots.forEach((dot) => dot.addEventListener('click', () => {
    currentIndex = Number(dot.dataset.defenseIndex)
    render()
  }))

  document.addEventListener('tower:defender:modechange', (event) => {
    currentMode = event.detail.mode
    render()
  })

  defenseVisual?.addEventListener('mousemove', (event) => {
    const origin = getTowerAimOrigin(towerPreview, {
      mode: currentMode,
      type: archetypes[currentIndex].id,
    })
    aimRotation = Math.atan2(event.clientY - origin.y, event.clientX - origin.x)
    scheduleTowerDraw()
  })

  defenseVisual?.addEventListener('mouseleave', () => {
    aimRotation = defaultAimRotation
    scheduleTowerDraw()
  })

  let resizeFrame
  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(resizeFrame)
    resizeFrame = window.requestAnimationFrame(() => {
      drawCurrentTower()
    })
  })

  render()
}
