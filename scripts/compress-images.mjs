import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync, cpSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'public', 'images')
const BACKUP = join(ROOT, 'public', 'images-original')

const MAX_WIDTH = 1400
const QUALITY = 82

// --- Backup ---
if (!existsSync(BACKUP)) {
  console.log('📦 Backing up originals to public/images-original/ ...')
  cpSync(SRC, BACKUP, { recursive: true })
  console.log('✓ Backup complete\n')
} else {
  console.log('✓ Backup already exists — skipping\n')
}

// --- Compress ---
let totalBefore = 0
let totalAfter = 0
let count = 0

async function processDir(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      await processDir(full)
      continue
    }
    if (!['.jpg', '.jpeg'].includes(extname(entry).toLowerCase())) continue

    const before = statSync(full).size
    totalBefore += before

    const meta = await sharp(full).metadata()
    const resizeOpts = meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : {}

    const compressed = await sharp(full)
      .resize(resizeOpts)
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer()

    const after = compressed.length
    totalAfter += after
    count++

    const saving = Math.round((1 - after / before) * 100)
    const beforeKB = Math.round(before / 1024)
    const afterKB = Math.round(after / 1024)
    console.log(`  ${entry.padEnd(45)} ${beforeKB}KB → ${afterKB}KB  (${saving}% smaller)`)

    await sharp(compressed).toFile(full)
  }
}

console.log('🗜  Compressing images...\n')
await processDir(SRC)

const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)
const beforeMB = (totalBefore / 1024 / 1024).toFixed(1)
const afterMB = (totalAfter / 1024 / 1024).toFixed(1)

console.log(`\n✓ Done — ${count} images`)
console.log(`  Before: ${beforeMB} MB`)
console.log(`  After:  ${afterMB} MB`)
console.log(`  Saved:  ${savedMB} MB (${Math.round((1 - totalAfter / totalBefore) * 100)}% reduction)`)
console.log('\nTo restore originals:')
console.log('  node scripts/restore-images.mjs')
