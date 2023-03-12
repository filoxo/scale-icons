// https://vitejs.dev/guide/features.html#glob-import
const sourcesRaw = import.meta.glob('./svg/*.svg', { eager: true }) as Record<string, any>

export const sources = Object.keys(sourcesRaw).map((source) => {
  const basename = source.split('/').pop().split('.').shift()
  return basename
})

export type IconNames = keyof typeof sources
