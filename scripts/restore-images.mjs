import { cpSync, existsSync, rmSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'public', 'images')
const BACKUP = join(ROOT, 'public', 'images-original')

if (!existsSync(BACKUP)) {
  console.error('✗ No backup found at public/images-original/ — nothing to restore.')
  process.exit(1)
}

console.log('Restoring originals from public/images-original/ ...')
rmSync(SRC, { recursive: true })
cpSync(BACKUP, SRC, { recursive: true })
console.log('✓ Originals restored. public/images/ is back to its original state.')
console.log('\nThe backup folder public/images-original/ has been kept.')
console.log('Delete it manually if you no longer need it.')
