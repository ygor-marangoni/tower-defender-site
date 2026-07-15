const FUTURISTIC_TOWERS = {
  basic: { color: '#38bdf8', accent: '#bae6fd' },
  rapid: { color: '#34d399', accent: '#bbf7d0' },
  heavy: { color: '#f59e0b', accent: '#fde68a' },
}

const MEDIEVAL_ART = {
  stoneLight: '#bca98a',
  stoneMid: '#8b7355',
  stoneDark: '#5f4d38',
  wood: '#7b5536',
  woodDark: '#4b2f1d',
  iron: '#545454',
  steel: '#8a8a83',
  gold: '#d6a84f',
  goldDark: '#a87b29',
  royalRed: '#8f2e2e',
  parchment: '#e7d8b6',
}

function roundedRect(ctx, x, y, width, height, radius) {
  const right = x + width
  const bottom = y + height
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(right - radius, y)
  ctx.quadraticCurveTo(right, y, right, y + radius)
  ctx.lineTo(right, bottom - radius)
  ctx.quadraticCurveTo(right, bottom, right - radius, bottom)
  ctx.lineTo(x + radius, bottom)
  ctx.quadraticCurveTo(x, bottom, x, bottom - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function drawFuturisticTower(ctx, type, rotation = -0.28) {
  const tower = FUTURISTIC_TOWERS[type] || FUTURISTIC_TOWERS.basic
  const radius = type === 'heavy' ? 25 : 23

  ctx.fillStyle = '#0d141f'
  ctx.strokeStyle = tower.color
  ctx.lineWidth = 1.7
  ctx.beginPath()
  for (let side = 0; side < 6; side += 1) {
    const angle = Math.PI / 6 + side * Math.PI / 3
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (side === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.save()
  ctx.rotate(rotation)
  ctx.fillStyle = tower.accent
  roundedRect(ctx, -3, -5, type === 'heavy' ? 43 : 38, 10, 4)
  ctx.fill()
  ctx.fillStyle = tower.color
  ctx.beginPath()
  ctx.arc(0, 0, type === 'heavy' ? 9 : 8, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#071017'
  ctx.beginPath()
  ctx.arc(0, 0, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawMedievalArcher(ctx, rotation = -0.2) {
  const art = MEDIEVAL_ART
  ctx.fillStyle = art.stoneDark
  ctx.beginPath()
  ctx.moveTo(-22, 8)
  ctx.lineTo(-24, 2)
  ctx.lineTo(24, 2)
  ctx.lineTo(22, 8)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = art.stoneMid
  ctx.beginPath()
  ctx.moveTo(-18, 2)
  ctx.lineTo(-20, -14)
  ctx.lineTo(20, -14)
  ctx.lineTo(18, 2)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = art.stoneLight
  ctx.beginPath()
  ctx.moveTo(-8, 2)
  ctx.lineTo(-10, -14)
  ctx.lineTo(10, -14)
  ctx.lineTo(8, 2)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = art.stoneDark
  ctx.fillRect(-16, -8, 6, 3)
  ctx.fillRect(10, -6, 6, 3)
  ctx.fillRect(-6, -2, 5, 2.5)
  ctx.fillRect(4, 0, 4, 2)

  ctx.fillStyle = art.woodDark
  ctx.beginPath()
  ctx.moveTo(-22, -14)
  ctx.lineTo(-24, -20)
  ctx.lineTo(24, -20)
  ctx.lineTo(22, -14)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = art.stoneLight
  for (const x of [-20, -12, -4, 4, 12, 20]) ctx.fillRect(x - 3, -26, 6, 8)

  ctx.fillStyle = art.stoneMid
  ctx.fillRect(-16, -24, 4, 6)
  ctx.fillRect(-8, -24, 4, 6)
  ctx.fillRect(0, -24, 4, 6)
  ctx.fillRect(8, -24, 4, 6)

  ctx.fillStyle = art.royalRed
  ctx.beginPath()
  ctx.moveTo(0, -26)
  ctx.lineTo(0, -32)
  ctx.lineTo(8, -30)
  ctx.lineTo(0, -28)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = art.woodDark
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, -26)
  ctx.lineTo(0, -32)
  ctx.stroke()

  ctx.fillStyle = '#5c3d26'
  ctx.beginPath()
  ctx.moveTo(-5, -26)
  ctx.lineTo(-6, -34)
  ctx.lineTo(6, -34)
  ctx.lineTo(5, -26)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = '#e8d4b8'
  ctx.beginPath()
  ctx.arc(0, -37, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = art.steel
  ctx.beginPath()
  ctx.arc(0, -38, 4.5, Math.PI, 0)
  ctx.fill()

  ctx.save()
  ctx.translate(0, -34)
  ctx.rotate(rotation)
  ctx.strokeStyle = art.wood
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(5, 0, 7, -Math.PI * 0.7, Math.PI * 0.3)
  ctx.stroke()

  ctx.strokeStyle = art.parchment
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(-1.5, -4)
  ctx.lineTo(5, 0)
  ctx.lineTo(-1.5, 4)
  ctx.stroke()

  ctx.strokeStyle = art.steel
  ctx.lineWidth = 1.1
  ctx.beginPath()
  ctx.moveTo(-2, 0)
  ctx.lineTo(17, 0)
  ctx.stroke()
  ctx.fillStyle = art.gold
  ctx.beginPath()
  ctx.moveTo(17, 0)
  ctx.lineTo(13, -2.3)
  ctx.lineTo(13, 2.3)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  ctx.fillStyle = art.wood
  ctx.fillRect(-18, -16, 36, 3)
  ctx.fillStyle = art.woodDark
  ctx.fillRect(-18, -16, 36, 1)
}

function drawMedievalCrossbow(ctx, rotation = -0.2) {
  const art = MEDIEVAL_ART
  ctx.fillStyle = art.stoneDark
  roundedRect(ctx, -21, 4, 42, 15, 5)
  ctx.fill()
  ctx.fillStyle = art.stoneMid
  roundedRect(ctx, -17, -4, 34, 19, 5)
  ctx.fill()
  ctx.fillStyle = art.stoneLight
  roundedRect(ctx, -11, -7, 22, 6, 3)
  ctx.fill()

  ctx.fillStyle = art.woodDark
  ctx.beginPath()
  ctx.moveTo(-18, -4)
  ctx.lineTo(0, -18)
  ctx.lineTo(18, -4)
  ctx.lineTo(11, 5)
  ctx.lineTo(-11, 5)
  ctx.closePath()
  ctx.fill()

  ctx.save()
  ctx.rotate(rotation)
  ctx.fillStyle = art.wood
  roundedRect(ctx, -13, -5, 39, 10, 4)
  ctx.fill()
  ctx.strokeStyle = art.steel
  ctx.lineWidth = 4.2
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(-18, -15)
  ctx.quadraticCurveTo(-3, -28, 18, -14)
  ctx.moveTo(-18, 15)
  ctx.quadraticCurveTo(-3, 28, 18, 14)
  ctx.stroke()
  ctx.strokeStyle = art.parchment
  ctx.lineWidth = 1.1
  ctx.beginPath()
  ctx.moveTo(-18, -15)
  ctx.lineTo(-7, 0)
  ctx.lineTo(-18, 15)
  ctx.stroke()
  ctx.strokeStyle = art.gold
  ctx.lineWidth = 2.4
  ctx.beginPath()
  ctx.moveTo(-5, 0)
  ctx.lineTo(31, 0)
  ctx.stroke()
  ctx.fillStyle = art.gold
  ctx.beginPath()
  ctx.moveTo(31, 0)
  ctx.lineTo(26, -3)
  ctx.lineTo(26, 3)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawMedievalCannon(ctx, rotation = -0.22) {
  const art = MEDIEVAL_ART
  ctx.fillStyle = art.woodDark
  roundedRect(ctx, -26, 1, 52, 21, 6)
  ctx.fill()
  ctx.fillStyle = art.wood
  roundedRect(ctx, -21, -7, 42, 20, 5)
  ctx.fill()

  for (const x of [-16, 16]) {
    ctx.fillStyle = '#2d261f'
    ctx.beginPath()
    ctx.arc(x, 16, 9, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = art.goldDark
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = art.steel
    ctx.beginPath()
    ctx.arc(x, 16, 2.5, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.save()
  ctx.rotate(rotation)
  ctx.fillStyle = '#343434'
  roundedRect(ctx, -11, -9, 43, 18, 8)
  ctx.fill()
  ctx.fillStyle = '#5f5f5f'
  roundedRect(ctx, -8, -7, 35, 6, 4)
  ctx.fill()
  ctx.fillStyle = '#262626'
  roundedRect(ctx, 25, -11, 12, 22, 5)
  ctx.fill()
  ctx.fillStyle = art.gold
  roundedRect(ctx, -1, -10, 7, 20, 2)
  ctx.fill()
  ctx.fillStyle = art.goldDark
  roundedRect(ctx, 18, -10, 7, 20, 3)
  ctx.fill()
  ctx.restore()
}

function drawMedievalTower(ctx, type, rotation) {
  if (type === 'rapid') drawMedievalCrossbow(ctx, rotation)
  else if (type === 'heavy') drawMedievalCannon(ctx, rotation)
  else drawMedievalArcher(ctx, rotation)
}

const MEDIEVAL_PREVIEW_LAYOUT = {
  basic: { x: 0, y: 22, scale: 1 },
  rapid: { x: 0, y: -10, scale: 1 },
  heavy: { x: -4, y: -8, scale: 1 },
}

export function getTowerAimOrigin(canvas, { mode, type }) {
  const rect = canvas.getBoundingClientRect()
  const layout = MEDIEVAL_PREVIEW_LAYOUT[type] || MEDIEVAL_PREVIEW_LAYOUT.basic
  const scale = Math.min(rect.width, rect.height) / (mode === 'medieval' ? 82 : 84)
  const x = rect.left + rect.width / 2 + (mode === 'medieval' ? layout.x : 0)
  let y = rect.top + rect.height / 2 + (mode === 'medieval' ? layout.y : 0)
  if (mode === 'medieval' && type === 'basic') y -= 34 * scale
  return { x, y }
}

export function renderTowerPreview(canvas, { mode, type, rotation = -0.25 }) {
  if (!(canvas instanceof HTMLCanvasElement)) return

  const width = canvas.clientWidth || 150
  const height = canvas.clientHeight || 150
  const density = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(width * density)
  canvas.height = Math.round(height * density)

  const ctx = canvas.getContext('2d')
  ctx.setTransform(density, 0, 0, density, 0, 0)
  ctx.clearRect(0, 0, width, height)
  ctx.imageSmoothingEnabled = true

  const medievalLayout = MEDIEVAL_PREVIEW_LAYOUT[type] || MEDIEVAL_PREVIEW_LAYOUT.basic
  const scale = Math.min(width, height) / (mode === 'medieval' ? 82 : 84)
  ctx.save()
  ctx.translate(
    width / 2 + (mode === 'medieval' ? medievalLayout.x : 0),
    height / 2 + (mode === 'medieval' ? medievalLayout.y : 0),
  )
  ctx.scale(scale * (mode === 'medieval' ? medievalLayout.scale : 1), scale * (mode === 'medieval' ? medievalLayout.scale : 1))
  if (mode === 'medieval') drawMedievalTower(ctx, type, rotation)
  else drawFuturisticTower(ctx, type, rotation)
  ctx.restore()
}
