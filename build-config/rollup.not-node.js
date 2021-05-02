//
// Build with Rollup
//

const json = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const cleanup = require('rollup-plugin-cleanup')

const pkg = require('../package.json')
const { paths, banner, outputs } = require('./common')

const terserConfig = {
  output: {
    ecma: 5,
    comments: (node, comment) => {
      var text = comment.value
      var type = comment.type
      if (type == 'comment2') {
        // multiline comment
        return /License: /.test(text)
      }
    }
  }
}

module.exports = {
  input: paths.SRC,
  output: outputs
    .filter(output => output.format !== 'cjs')
    .map(output => ({
      ...output,
      banner: banner(pkg),
      plugins: [terser(terserConfig)],
      exports: 'auto',
      name: 'composePaths'
    })),
  plugins: [
    json(),
    replace({
      preventAssignment: true,
      'process.env.RUNNING_JEST': '"false"',
      'process.env.BUILD_FOR_NODE': `"false"`
    }),
    nodeResolve(),
    commonjs(),
    cleanup()
  ]
}
