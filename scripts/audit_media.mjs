#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const ROOT_DIR = new URL('..', import.meta.url).pathname.slice(1)
const MEDIA_CONFIG_PATH = path.join(ROOT_DIR, 'content', 'media.yml')
const MEDIA_DIR = path.join(ROOT_DIR, 'frontend', 'public', 'media')

// Load media configuration
let mediaConfig = {}
try {
  const configContent = fs.readFileSync(MEDIA_CONFIG_PATH, 'utf-8')
  mediaConfig = yaml.load(configContent)
} catch (err) {
  console.error(`❌ No se pudo cargar ${MEDIA_CONFIG_PATH}:`, err.message)
  process.exit(1)
}

const media = mediaConfig.media || []

// Scan actual files
const actualFiles = new Set()
function scanDir(dir) {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    files.forEach((file) => {
      const fullPath = path.join(dir, file.name)
      const relativePath = path.relative(MEDIA_DIR, fullPath).replace(/\\/g, '/')
      if (file.isDirectory()) {
        scanDir(fullPath)
      } else {
        actualFiles.add(`/media/${relativePath}`)
      }
    })
  } catch (err) {
    // Directory doesn't exist yet
  }
}

scanDir(MEDIA_DIR)

// Audit
let available = 0
let missing = 0
let restricted = 0
let planned = 0
let errors = []
const declaredPaths = new Set()

console.log('📊 AUDITORÍA DE MEDIOS\n')

media.forEach((item) => {
  declaredPaths.add(item.path)

  const fileExists = actualFiles.has(item.path)

  if (item.status === 'available' && !fileExists) {
    errors.push(`❌ FALTA: ${item.id} (${item.path}) - marcado como 'available' pero no existe`)
    missing++
  } else if (item.status === 'missing') {
    missing++
  } else if (item.status === 'restricted') {
    restricted++
  } else if (item.status === 'planned') {
    planned++
  } else if (fileExists) {
    available++
  }

  if (!item.alt || item.alt.trim().length === 0) {
    errors.push(`⚠️  SIN ALT: ${item.id} - atributo 'alt' vacío`)
  }

  if (!item.path || !item.path.startsWith('/media/')) {
    errors.push(`❌ RUTA INVÁLIDA: ${item.id} (${item.path})`)
  }
})

// Find undeclared files
const undeclaredFiles = Array.from(actualFiles).filter((f) => !declaredPaths.has(f))

console.log(`✅ Disponibles: ${available}`)
console.log(`⏳ Planeados: ${planned}`)
console.log(`⚠️  Faltantes: ${missing}`)
console.log(`🔒 Restringidos: ${restricted}`)
console.log(`📦 Total declarados: ${media.length}`)
console.log(`📁 Total en carpetas: ${actualFiles.size}\n`)

if (errors.length > 0) {
  console.log('⚠️  PROBLEMAS ENCONTRADOS:\n')
  errors.forEach((error) => console.log(error))
  console.log()
}

if (undeclaredFiles.length > 0) {
  console.log(`📂 ${undeclaredFiles.length} archivos no declarados en media.yml:\n`)
  undeclaredFiles.slice(0, 20).forEach((file) => console.log(`  ${file}`))
  if (undeclaredFiles.length > 20) {
    console.log(`  ... y ${undeclaredFiles.length - 20} más\n`)
  }
  console.log()
}

// Summary
const hasBlockingErrors = errors.some((e) => e.startsWith('❌ FALTA:'))

console.log('═'.repeat(60))
if (hasBlockingErrors) {
  console.log('❌ AUDITORÍA FALLIDA: Hay imágenes marcadas como "available" que no existen')
  process.exit(1)
} else {
  console.log('✅ AUDITORÍA EXITOSA: No hay inconsistencias críticas')
  process.exit(0)
}
