import { globby } from 'globby';
import { parse } from 'postsvg'
import { readFile, writeFile } from 'node:fs/promises'
import { optimize, loadConfig } from 'svgo';
import mixer from 'svg-mixer';

const SVG_WILDCARD = 'src/svg/*.svg'

const validate = (tree) => {
  // TODO: validate naming convention?

  const VIEWBOX_MATCH = '0 0 24 24'

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
}

const paths = await globby(SVG_WILDCARD);
const svgoConfig = await loadConfig();

const pipelines = paths.map(async (path) => {
  // pipeline per file
  const contents = await readFile(path, 'utf-8')
  const svgAst = parse(contents)
  validate(svgAst)
  const { data } = optimize(contents, { ...svgoConfig, path })
  return writeFile(path, data)
})

const results = await Promise.allSettled(pipelines)

const errors = results
  .filter(result => result.status === 'rejected')
  .map(err => err.reason)

if(errors.length > 0) {
  console.warn(`Encountered ${errors.length} svg errors!\n`)
  console.table(errors)
  process.exit(1)
} else {
  console.info('SVG preprocessing complete!')
  // process.exit(0)
}

const filenamesUnion = paths.map((path) => {
  const filename = path.split('/').pop().split('.').shift()
  return `${JSON.stringify(filename)}`
}).join('\n\t| ')

// could use ts-morph but... this is simpler. its just a union of string literals.
const IconTypeSource = `export type IconName = ${filenamesUnion};`

await writeFile('src/IconName.type.ts', IconTypeSource)

const spritesheet = await mixer(SVG_WILDCARD, 
  {
    spriteType: 'stack', 
    spriteConfig: {
      usages: false,
      usageClassName: 'icon-sprite'
      
    }
  }
)

await spritesheet.write('dist/sprite.svg')
console.info('sprite.svg written to dist/')