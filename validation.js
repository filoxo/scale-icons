import { globby } from 'globby';
import { parse } from 'postsvg'
import { readFile } from 'fs/promises'

const VIEWBOX_MATCH = '0 0 24 24'

const paths = await globby('src/svg/*.svg');
const pipelines = paths.map(async (path) => {
  // pipeline per file
  const contents = await readFile(path, 'utf-8')
  const tree = parse(contents)

  // check for viewBox match
  if(tree.root?.attrs?.viewBox !== VIEWBOX_MATCH) {
    throw new Error(`viewBox is incorrect for ${path}. Icon svg sources must have a viewBox of ${VIEWBOX_MATCH}`)
  }
  // ensure no width attribute
  if(!tree.root.attrs.width === false) {
    throw new Error(`width is incorrect for ${path}. Icon svg sources must not have defined width attribute.`)
  }
  // ensure no height attribute
  if(!tree.root.attrs.height === false) {
    throw new Error(`height is incorrect for ${path}. Icon svg sources must not have defined height attribute.`)
  }
})

const results = await Promise.allSettled(pipelines)
const errors = results.filter(result => result.status === 'rejected')

if(errors.length > 0) {
  console.warn(`Encountered ${errors.length} svg source errors!\n`)
  console.table(errors, ['reason'])
  process.exit(1)
} else {
  console.info('SVG validation complete!')
  process.exit(0)
}