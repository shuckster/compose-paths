//
// Build with esbuild
//

const fs = require('fs')
const esbuild = require('esbuild')
const pkg = require('../package.json')

const { match, when, otherwise } = require('match-iz')
const { paths, banner, outputs } = require('./common')
const { pipe } = require('../src/fp')

const main = () =>
  pipe(
    outputs,
    $ => $.map(buildOutput),
    $ => Promise.all($)
  )

const buildOutput = output =>
  buildComposePaths({
    ...output,
    define: {
      'process.env.RUNNING_JEST': '"false"',
      'process.env.BUILD_FOR_NODE': `"${buildForNode(output.format)}"`
    }
  })

function buildComposePaths({ file, format, define }) {
  const buildOptions = {
    entryPoints: [paths.SRC],
    define,
    format,
    ...match(format)(
      when('iife')({ platform: 'browser', globalName: 'composePaths' }),
      otherwise({ platform: 'node' })
    ),
    target: ['es6'],
    minify: true,
    bundle: true,
    write: false
  }
  return esbuild
    .build(buildOptions)
    .then(getConcatenatedEsbuildContent)
    .then($ => new TextDecoder().decode($))
    .then(text => banner(pkg, text))
    .then(writeTextFile(file))
}

const buildForNode = format => (format === 'cjs' ? 'true' : 'false')

//
// Helpers
//

const getConcatenatedEsbuildContent = build =>
  pipe(
    build.outputFiles,
    $ => $.map(file => file.contents),
    mergeTypedArrays(Uint8Array)
  )

// https://stackoverflow.com/a/56993335/127928
const mergeTypedArrays = TypeConstructor => arrays =>
  pipe(
    arrays,
    accumulatedByteLength,
    byteLength => new TypeConstructor(byteLength),
    concatArraysFrom(arrays)
  )

const concatArraysFrom = arrays => presizedArray => {
  arrays.reduce((offset, arr) => {
    presizedArray.set(arr, offset)
    return offset + arr.byteLength
  }, 0)
  return presizedArray
}

function accumulatedByteLength(arrays) {
  return arrays.reduce((acc, arr) => acc + arr.byteLength, 0)
}

function writeTextFile(path) {
  return textContent =>
    Promise.resolve(path).then($ => fs.writeFileSync($, textContent))
}

//
// Entry point
//

main()
