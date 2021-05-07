const { composePaths } = require('../src/compose-paths')

const paths = composePaths(`

  ${__dirname}/../

    /src
      /compose-paths.js             = SRC

    /dist
      /compose-paths.esm.js         = DIST_ESM
      /compose-paths.cjs.js         = DIST_CJS
      /compose-paths.browser.js     = DIST_IIFE

`)

const outputs = [
  {
    file: paths.DIST_ESM,
    format: 'esm'
  },
  {
    file: paths.DIST_CJS,
    format: 'cjs'
  },
  {
    file: paths.DIST_IIFE,
    format: 'iife'
  }
]

function banner(pkg, build = '') {
  return `/*
 * compose-paths
 * v${pkg.version}
 * ${pkg.homepage}
 * License: ${pkg.license}
 */
${build}`
}

module.exports = {
  paths,
  outputs,
  banner
}
