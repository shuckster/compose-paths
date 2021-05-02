const fs = require('fs')
const esbuild = require('esbuild')

const { composePaths } = require('./src/compose-paths')

const paths = composePaths(`
  ${__dirname}
    /src
      /compose-paths.js     = SRC

    /dist                   = DIST
      /compose-paths.min.js = DIST_MIN
      /compose-paths.js     = DIST_MAX

`)

// Require /dist folder before moving on...

if (!fs.statSync(paths.DIST).isDirectory()) {
  process.exit(255)
}

const IS_LOCAL = (process.env.NODE_ENV || 'local') === 'local'
const SOURCE_MAPS = false // IS_LOCAL
const BUILD_REPLACEMENTS = {
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
}
const ifLocal = getIf(() => IS_LOCAL, '')

console.log('paths', paths)
console.log('IS_LOCAL', IS_LOCAL)

function main() {
  const concurrentJobs = [
    buildMain(true, paths.DIST_MIN),
    buildMain(false, paths.DIST_MAX)
  ]

  return Promise.all(concurrentJobs)
}

//
// Builders
//

const commonBuildOptions = {
  bundle: true,
  define: BUILD_REPLACEMENTS,
  sourcemap: SOURCE_MAPS,
  platform: 'browser',
  target: ['es6']
}

function buildMain(minify, outfile) {
  const options = {
    ...commonBuildOptions,
    entryPoints: [paths.SRC],
    minify,
    outfile
  }
  return esbuild.build(options)
}

main()

//
// Helpers
//

function getIf(pred, fallback = '') {
  return val => (pred() ? val : fallback)
}
