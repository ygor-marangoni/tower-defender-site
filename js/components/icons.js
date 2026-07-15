const iconCache = new Map()

async function loadIcon(name) {
  if (!iconCache.has(name)) {
    const iconUrl = new URL(`../../assets/icons/${name}.svg`, import.meta.url)
    iconCache.set(name, fetch(iconUrl).then(async (response) => {
      if (!response.ok) throw new Error(`Não foi possível carregar o ícone ${name}.`)
      const markup = await response.text()
      const documentNode = new DOMParser().parseFromString(markup, 'image/svg+xml')
      const svg = documentNode.documentElement
      svg.setAttribute('aria-hidden', 'true')
      svg.setAttribute('focusable', 'false')
      return svg
    }))
  }

  return (await iconCache.get(name)).cloneNode(true)
}

export async function renderIcon(container, name) {
  if (!container) return
  try {
    container.replaceChildren(await loadIcon(name))
  } catch (error) {
    console.error(error)
  }
}

export async function hydrateIcons(root = document) {
  const placeholders = [...root.querySelectorAll('[data-icon]')]
  await Promise.all(placeholders.map(async (placeholder) => {
    const svg = await loadIcon(placeholder.dataset.icon)
    placeholder.replaceWith(svg)
  }))
}
