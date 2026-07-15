import { initNavigation } from './navigation.js'
import { initAnimations } from './animations.js'
import { initModeSelector } from './components/mode-selector.js'
import { initDefenseCarousel } from './components/carousel.js'
import { hydrateIcons } from './components/icons.js'
import { initRecords } from './components/records.js'
import { initFloatingNavigation } from './components/floating-nav.js'
import { initTutorialShortcuts } from './components/tutorial-shortcuts.js'

async function initializePage() {
  initNavigation()
  initFloatingNavigation()
  initTutorialShortcuts()
  initRecords()
  const selectMode = initModeSelector()
  initDefenseCarousel({ selectMode })
  const iconsReady = hydrateIcons()
  initAnimations({ ready: iconsReady })
  await iconsReady
}

initializePage()
