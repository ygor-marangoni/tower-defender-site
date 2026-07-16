const heroReveals = [
  { selector: '.brand', type: 'fade', delay: 0, duration: 620 },
  { selector: '.hero-overline', type: 'rise', delay: 80, distance: 12 },
  { selector: '.hero-reference h1', type: 'rise', delay: 160, distance: 16 },
  { selector: '.hero-reference .hero-lead', type: 'rise', delay: 240, distance: 14 },
  { selector: '.hero-reference .hero-cta', type: 'rise', delay: 320, distance: 12 },
  { selector: '.hero-reference .hero-meta', type: 'fade', delay: 400, duration: 660 },
]

const viewportReveals = [
  { selector: '.hero-reference .hero-feature-image', type: 'fade', duration: 700 },
  { selector: '#jogar .modes-heading h2', type: 'rise', distance: 16 },
  { selector: '#jogar .modes-heading-action', type: 'fade', delay: 80, duration: 660 },
  { selector: '#jogar .mode-card', type: 'fade', stagger: 80, duration: 680 },

  { selector: '#defesas .defenses-intro h2', type: 'rise', distance: 16 },
  { selector: '#defesas .defenses-heading', type: 'fade', duration: 660 },
  { selector: '#defesas .defense-visual', type: 'fade', duration: 700 },
  { selector: '#defesas .defense-description', type: 'rise', distance: 12 },
  { selector: '#defesas .defense-slide h3', type: 'rise', delay: 80, distance: 14 },
  { selector: '#defesas .defense-role-copy', type: 'rise', delay: 160, distance: 12 },
  { selector: '#defesas .defense-stats', type: 'rise', delay: 240, distance: 12 },
  { selector: '#defesas .defense-dots', type: 'fade', duration: 680 },

  { selector: '#ranking .ranking-intro h2', type: 'rise', distance: 16 },
  { selector: '#ranking .ranking-copy', type: 'fade', duration: 680 },
  { selector: '#ranking .ranking-table-header', type: 'rise', distance: 12 },
  { selector: '#ranking .ranking-table-row', type: 'rise', stagger: 70, distance: 12 },

  { selector: '#tutorial .tutorial-heading h2', type: 'rise', distance: 16 },
  { selector: '#tutorial .tutorial-heading-action', type: 'fade', delay: 80, duration: 680 },
  { selector: '#tutorial .gameplay-loop article', type: 'rise', stagger: 70, distance: 12 },
  { selector: '#tutorial .tutorial-callout', type: 'fade', duration: 680 },

  { selector: 'footer .footer-brand', type: 'rise', distance: 14 },
  { selector: 'footer .footer-nav', type: 'fade', delay: 70, duration: 680 },
  { selector: 'footer .footer-start', type: 'fade', delay: 140, duration: 680 },
  { selector: 'footer .footer-bottom', type: 'fade', delay: 70, duration: 680 },
]

function prepareReveals(definitions, baseDelay = 0) {
  return definitions.flatMap(({ selector, type, delay = 0, stagger = 0, duration = 700, distance = 14 }, group) => (
    [...document.querySelectorAll(selector)].map((element) => {
      element.dataset.motion = type
      element.style.setProperty('--motion-item-duration', `${duration}ms`)
      if (type === 'rise') element.style.setProperty('--motion-distance', `${distance}px`)
      return { element, group, delay: baseDelay + delay, stagger, duration }
    })
  ))
}

function cleanReveal(element) {
  element.classList.remove('is-motion-visible')
  element.removeAttribute('data-motion')
  element.style.removeProperty('--motion-delay')
  element.style.removeProperty('--motion-item-duration')
  element.style.removeProperty('--motion-distance')
}

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration))

function updateLoader(loader, progress) {
  const bar = loader.querySelector('[data-loader-bar]')
  const fill = loader.querySelector('[data-loader-fill]')
  const dot = loader.querySelector('[data-loader-dot]')
  const percentage = loader.querySelector('[data-loader-percent]')
  const value = Math.max(0, Math.min(100, progress))
  const roundedValue = Math.round(value)

  if (fill) fill.style.transform = `scaleX(${value / 100})`
  if (dot && bar) {
    const travel = Math.max(0, bar.clientWidth - 20)
    dot.style.opacity = value > 1 ? '1' : '0'
    dot.style.transform = `translate3d(${travel * value / 100}px, -50%, 0)`
  }
  if (percentage) percentage.textContent = `${roundedValue}%`
  loader.setAttribute('aria-label', `Carregando Tower Defensor, ${roundedValue} por cento`)
}

function animateLoaderProgress(loader, from, to, duration) {
  return new Promise((resolve) => {
    const startedAt = performance.now()

    const tick = (now) => {
      const elapsed = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - ((1 - elapsed) ** 3)
      updateLoader(loader, from + (to - from) * eased)

      if (elapsed < 1) window.requestAnimationFrame(tick)
      else resolve()
    }

    window.requestAnimationFrame(tick)
  })
}

function waitForPageReady(appReady = Promise.resolve()) {
  const pageLoaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
  const fontsLoaded = document.fonts?.ready ?? Promise.resolve()
  return Promise.race([
    Promise.allSettled([pageLoaded, fontsLoaded, appReady]),
    wait(2400),
  ])
}

async function playLoader(loader, onExit, onComplete, appReady) {
  if (!loader) {
    onExit()
    onComplete()
    return
  }

  updateLoader(loader, 0)
  await Promise.all([
    animateLoaderProgress(loader, 0, 92, 1500),
    waitForPageReady(appReady),
  ])
  await animateLoaderProgress(loader, 92, 100, 280)
  await wait(160)
  loader.classList.add('is-controlled', 'is-leaving')
  onExit()
  await wait(640)
  loader.hidden = true
  loader.setAttribute('aria-hidden', 'true')
  onComplete()
}

export function initAnimations({ ready } = {}) {
  const root = document.documentElement
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const loader = document.querySelector('[data-site-loader]')
  let observer
  let safetyTimer
  let motionCancelled = false

  const setPageLoading = (loading) => {
    root.classList.toggle('is-site-loading', loading)
    if (loading) document.body.setAttribute('aria-busy', 'true')
    else document.body.removeAttribute('aria-busy')
  }

  setPageLoading(Boolean(loader))

  const revealEverything = () => {
    window.clearTimeout(safetyTimer)
    observer?.disconnect()
    motionCancelled = true
    root.classList.remove('motion-ready')
    document.querySelectorAll('[data-motion]').forEach(cleanReveal)
    if (loader) {
      loader.hidden = true
      loader.setAttribute('aria-hidden', 'true')
    }
    setPageLoading(false)
  }

  const syncMotionPreference = () => {
    root.classList.toggle('reduced-motion', reducedMotion.matches)
    if (reducedMotion.matches) revealEverything()
  }

  const watchMotionPreference = () => {
    if (typeof reducedMotion.addEventListener === 'function') {
      reducedMotion.addEventListener('change', syncMotionPreference)
    } else {
      reducedMotion.addListener?.(syncMotionPreference)
    }
  }

  syncMotionPreference()
  if (reducedMotion.matches) {
    watchMotionPreference()
    return
  }

  try {
    const heroItems = prepareReveals(heroReveals)
    const viewportItems = prepareReveals(viewportReveals, 120)

    const itemByElement = new Map(viewportItems.map((item) => [item.element, item]))

    const showOnce = (item, siblingIndex = 0) => {
      const { element, delay, stagger, duration } = item
      if (motionCancelled || element.classList.contains('is-motion-visible')) return
      element.style.setProperty('--motion-delay', `${delay + siblingIndex * stagger}ms`)
      element.classList.add('is-motion-visible')

      const cleanupTimer = window.setTimeout(() => cleanReveal(element), delay + siblingIndex * stagger + duration + 250)
      element.addEventListener('animationend', () => {
        window.clearTimeout(cleanupTimer)
        cleanReveal(element)
      }, { once: true })
    }

    let activateViewportReveals = () => {}

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        try {
          const entering = entries.filter((entry) => entry.isIntersecting)
          const batches = new Map()

          entering.forEach((entry) => {
            observer.unobserve(entry.target)
            const item = itemByElement.get(entry.target)
            if (!item) return
            if (!batches.has(item.group)) batches.set(item.group, [])
            batches.get(item.group).push({ item, top: entry.boundingClientRect.top })
          })

          batches.forEach((batch) => {
            batch
              .sort((a, b) => a.top - b.top)
              .forEach(({ item }, siblingIndex) => showOnce(item, siblingIndex))
          })
        } catch (error) {
          console.error('Falha ao revelar o conteúdo da página.', error)
          revealEverything()
        }
      }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      })

      activateViewportReveals = () => {
        if (motionCancelled) return
        viewportItems.forEach(({ element }) => observer.observe(element))
      }
    } else {
      viewportItems.forEach(({ element }) => cleanReveal(element))
    }

    safetyTimer = window.setTimeout(revealEverything, 7000)
    root.classList.add('motion-ready')

    const revealHero = () => {
      if (motionCancelled) return
      heroItems.forEach((item) => showOnce(item))
      window.clearTimeout(safetyTimer)
    }

    const finishLoading = () => {
      setPageLoading(false)
      activateViewportReveals()
    }

    playLoader(loader, revealHero, finishLoading, ready).catch((error) => {
      console.error('Falha ao concluir a tela de carregamento.', error)
      if (loader) loader.hidden = true
      setPageLoading(false)
      revealHero()
      activateViewportReveals()
    })
  } catch (error) {
    console.error('Falha ao iniciar as animações da página.', error)
    revealEverything()
  }

  watchMotionPreference()
}
