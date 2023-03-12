const mixer = require('svg-mixer');

mixer('src/svg/*.svg', { spriteConfig: { usages: false }})
  .then(result => result.write('dist/sprite.svg'));