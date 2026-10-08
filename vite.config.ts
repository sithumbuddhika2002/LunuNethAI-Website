import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { documentCategory } from './src/documentCategories'

// Public assets keep their original URLs; only their metadata enters the bundle.
function researchPdfs(): Plugin {
  const moduleId = 'virtual:research-pdfs'
  const resolvedId = '\0' + moduleId
  let publicDir = ''
  let base = '/'

  return {
    name: 'research-pdfs',
    configResolved(config) {
      publicDir = config.publicDir || ''
      base = config.base
    },
    resolveId(id) {
      if (id === moduleId) return resolvedId
    },
    load(id) {
      if (id !== resolvedId) return
      const documents: { title: string; filename: string; url: string; category: string }[] = []
      const scan = (directory: string) => {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
          const path = join(directory, entry.name)
          if (entry.isDirectory()) scan(path)
          else if (entry.isFile() && /\.pdf$/i.test(entry.name)) {
            const pathParts = relative(publicDir, path).split(sep)
            const filePath = pathParts.map(encodeURIComponent).join('/')
            documents.push({
              title: entry.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' '),
              filename: entry.name,
              url: `${base}${filePath}`,
              category: documentCategory(pathParts.slice(0, -1)),
            })
          }
        }
      }
      if (publicDir) scan(publicDir)
      documents.sort((a, b) => a.title.localeCompare(b.title) || a.url.localeCompare(b.url))
      return `export default ${JSON.stringify(documents)}`
    },
    configureServer(server) {
      const refresh = (path: string) => {
        const local = relative(publicDir, path)
        if (!local.startsWith('..') && /\.pdf$/i.test(path)) {
          const module = server.moduleGraph.getModuleById(resolvedId)
          if (module) server.moduleGraph.invalidateModule(module)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', refresh).on('unlink', refresh)
      server.httpServer?.once('close', () => {
        server.watcher.off('add', refresh).off('unlink', refresh)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), researchPdfs()],
  base: '/',
})
