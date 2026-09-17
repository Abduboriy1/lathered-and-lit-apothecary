// Procedural label art -> PNG buffer (zero dependencies).
import { deflateSync } from 'node:zlib'

// ---------- procedural image (pure JS PNG) ----------

const PALETTES = [
  ['#0f5c5a', '#f2c9c2', '#f7f1e8', '#7fb3a8'], // teal / blush / cream / sage (brand)
  ['#2b4c4a', '#e8b4a8', '#fbf6ef', '#c9a66b'],
  ['#1c3a3a', '#f4d6cf', '#e6efe9', '#d9a5a0'],
  ['#5b7c74', '#f6e3d5', '#ffffff', '#b45f5f'],
]

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

export function renderImage(seed, size = 900) {
  const rnd = mulberry32(seed)
  const palette = PALETTES[Math.floor(rnd() * PALETTES.length)].map(hex)
  const bg = palette[2]
  const blobs = Array.from({ length: 5 + Math.floor(rnd() * 5) }, () => ({
    x: rnd() * size,
    y: rnd() * size,
    r: size * (0.25 + rnd() * 0.4),
    c: palette[Math.floor(rnd() * palette.length)],
    a: 0.8 + rnd() * 0.2,
  }))
  const stripe = rnd() < 0.5
  const stripeAngle = rnd() * Math.PI
  const stripeColor = palette[0]

  const px = Buffer.alloc(size * size * 3)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = bg[0], g = bg[1], b = bg[2]
      for (const s of blobs) {
        const dx = x - s.x, dy = y - s.y
        const d = Math.sqrt(dx * dx + dy * dy) / s.r
        if (d < 1) {
          const w = s.a * (1 - d * d)
          r += (s.c[0] - r) * w
          g += (s.c[1] - g) * w
          b += (s.c[2] - b) * w
        }
      }
      if (stripe) {
        const t = (x * Math.cos(stripeAngle) + y * Math.sin(stripeAngle)) / 36
        if (Math.floor(t) % 6 === 0) {
          r += (stripeColor[0] - r) * 0.25
          g += (stripeColor[1] - g) * 0.25
          b += (stripeColor[2] - b) * 0.25
        }
      }
      const grain = (rnd() - 0.5) * 10
      const o = (y * size + x) * 3
      px[o] = Math.max(0, Math.min(255, r + grain))
      px[o + 1] = Math.max(0, Math.min(255, g + grain))
      px[o + 2] = Math.max(0, Math.min(255, b + grain))
    }
  }
  // Centre "label" plate so it reads as product packaging.
  const plate = { x0: size * 0.22, y0: size * 0.36, x1: size * 0.78, y1: size * 0.64 }
  for (let y = plate.y0; y < plate.y1; y++) {
    for (let x = plate.x0; x < plate.x1; x++) {
      const o = (Math.floor(y) * size + Math.floor(x)) * 3
      const edge = x < plate.x0 + 6 || x > plate.x1 - 6 || y < plate.y0 + 6 || y > plate.y1 - 6
      const c = edge ? palette[0] : bg
      px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]
    }
  }
  // Brand mark: rule with two red dots either side, plus a thin accent bar.
  const dot = (cx, cy, rad, c) => {
    for (let y = cy - rad; y <= cy + rad; y++) for (let x = cx - rad; x <= cx + rad; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= rad * rad) {
        const o = (Math.floor(y) * size + Math.floor(x)) * 3
        px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]
      }
    }
  }
  const red = [178, 58, 58]
  const midY = (plate.y0 + plate.y1) / 2
  for (let x = plate.x0 + size * 0.12; x < plate.x1 - size * 0.12; x++) {
    for (let y = midY - 2; y <= midY + 2; y++) {
      const o = (Math.floor(y) * size + Math.floor(x)) * 3
      px[o] = palette[0][0]; px[o + 1] = palette[0][1]; px[o + 2] = palette[0][2]
    }
  }
  dot(plate.x0 + size * 0.09, midY, 7, red)
  dot(plate.x1 - size * 0.09, midY, 7, red)
  for (let x = plate.x0 + 6; x < plate.x1 - 6; x++) {
    for (let y = plate.y1 - 26; y < plate.y1 - 14; y++) {
      const o = (Math.floor(y) * size + Math.floor(x)) * 3
      px[o] = palette[3][0]; px[o + 1] = palette[3][1]; px[o + 2] = palette[3][2]
    }
  }
  return encodePng(px, size, size)
}

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td))
  return Buffer.concat([len, td, crc])
}
function encodePng(rgb, w, h) {
  const raw = Buffer.alloc((w * 3 + 1) * h)
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0
    rgb.copy(raw, y * (w * 3 + 1) + 1, y * w * 3, (y + 1) * w * 3)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

