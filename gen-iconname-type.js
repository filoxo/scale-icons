import { globby } from 'globby';
import { writeFile } from 'node:fs/promises'

const paths = await globby('src/svg/*.svg');
const filenames = paths.map((path) => {
  const filename = path.split('/').pop().split('.').shift()
  return `${JSON.stringify(filename)}`
}).join('\n\t| ')

// could use ts-morph but... this is simpler. its just a union of string literals.
const IconTypeSource = `export type IconName = ${filenames};`

await writeFile('src/IconName.d.ts', IconTypeSource)