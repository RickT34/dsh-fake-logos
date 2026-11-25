/**
 * Host plugin for dsh-fake-logos.
 * Declares volatile configuration fields persisted in the DSH profile settings
 * document and mirrored to the Web UI via `ctx.configForms`.
 */
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { dirname, join } from 'node:path'

function loadSchemastery() {
  const candidates = []
  if (process.env.DSH_INSTALL_DIR) candidates.push(join(process.env.DSH_INSTALL_DIR, 'package.json'))
  if (process.env.DSH_PROFILE_DIR) candidates.push(join(process.env.DSH_PROFILE_DIR, 'package.json'))
  for (const raw of [process.argv[1], process.cwd()]) {
    if (!raw) continue
    const roots = [raw]
    try { roots.push(realpathSync(raw)) } catch { /* ignore */ }
    for (const root of roots) {
      let dir = root.endsWith('.js') || root.endsWith('.mjs') || root.endsWith('.cjs') ? dirname(root) : root
      for (let i = 0; i < 6; i += 1) {
        candidates.push(join(dir, 'package.json'))
        const parent = dirname(dir)
        if (parent === dir) break
        dir = parent
      }
    }
  }
  candidates.push(import.meta.url)

  const seen = new Set()
  for (const anchor of candidates) {
    if (seen.has(anchor)) continue
    seen.add(anchor)
    try {
      const req = createRequire(anchor)
      const mod = req('@deepseek-ai/schemastery')
      return mod.default || mod
    } catch {
      // try next anchor
    }
  }
  throw new Error('dsh-fake-logos: unable to resolve @deepseek-ai/schemastery')
}

const z = loadSchemastery()

export const PRESET_IDS = [
  'none',
  'codex',
  'claude',
  'claudecode',
  'opencode',
  'antigravity',
  'cursor',
  'openai',
  'gemini',
  'copilot',
  'windsurf',
  'cline',
  'kiro',
  'trae',
  'custom',
  'default',
]

export const Config = z.object({
  preset: z.union(PRESET_IDS).default('codex').volatile(),
  monochrome: z.boolean().default(false).volatile(),
  replaceSidebar: z.boolean().default(true).volatile(),
  replaceHero: z.boolean().default(true).volatile(),
  hideHomeWhale: z.boolean().default(true).volatile(),
  customName: z.string().default('').volatile(),
  customIcon: z.string().default('').volatile(),
})

export function apply(ctx) {
  ctx.inject(['settings'], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber), 'dsh-fake-logos: settings')
  })
}
