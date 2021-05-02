//
// Build with esbuild
//

const fs = require('fs')
const esbuild = require('esbuild')
const pkg = require('../package.json')

const { paths, banner, outputs } = require('./common')

function main() {
  Promise.all(
    outputs.map(output =>
      buildComposePaths({
        ...output,
        define: {
          'process.env.RUNNING_JEST': '"false"',
          'process.env.BUILD_FOR_NODE': `"${
            output.format === 'cjs' ? 'true' : 'false'
          }"`
        }
      })
    )
  )
}

function buildComposePaths({ file, format, define }) {
  const decoder = new TextDecoder()
  return esbuild
    .build({
      entryPoints: [paths.SRC],
      define: define,
      format: format,
      ...(format === 'iife' && { globalName: 'composePaths' }),
      platform: 'node',
      target: ['es6'],
      minify: true,
      bundle: true,
      write: false
    })
    .then(getConcatenatedEsbuildContent)
    .then(buffer => decoder.decode(buffer))
    .then(text => banner(pkg, text))
    .then(writeTextFile(file))
}

//
// Helpers
//

function getConcatenatedEsbuildContent(build) {
  return mergeTypedArrays(
    build.outputFiles.map(out => out.contents),
    Uint8Array
  )
}

// https://stackoverflow.com/a/56993335/127928
const mergeTypedArrays = (arrays, type = Uint8Array) => {
  const result = new type(arrays.reduce((acc, arr) => acc + arr.byteLength, 0))
  let offset = 0
  arrays.forEach(arr => {
    result.set(arr, offset)
    offset += arr.byteLength
  })
  return result
}

function writeTextFile(path) {
  return textContent => {
    const [promise, resolve, reject] = makePromise()
    fs.writeFile(path, textContent, err => (err ? reject(err) : resolve()))
    return promise
  }
}

function makePromise() {
  let _resolve
  let _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  return [promise, _resolve, _reject]
}

//
// Entry point
//

main()
