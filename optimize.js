import { optimize, loadConfig } from 'svgo';
import { globby } from 'globby';
import { readFile, writeFile } from 'node:fs/promises'
// TODO: most of this file is duplicated with validation.js

const config = await loadConfig();
const paths = await globby('src/svg/*.svg');

const pipelines = paths.map(async (path) => {
  // pipeline per file
  const contents = await readFile(path, 'utf-8')
  const { data } = optimize(contents, { ...config, path })
  return writeFile(path, data)
})

const results = await Promise.allSettled(pipelines)
const errors = results.filter(result => result.status === 'rejected')

if(errors.length > 0) {
  console.warn(`Encountered ${errors.length} svg optimization errors!\n`)
  console.table(errors, ['reason'])
  process.exit(1)
} else {
  console.info('SVG optimization complete!')
  process.exit(0)
}