module.exports = {
  composePaths,
  zip
}

const join =
  process.env.BUILD_FOR_NODE !== 'true'
    ? require('url-join')
    : require('path').join

//
// MAIN
//

const ALIASES_PROP = 'aliases'

function composePaths(pathChart) {
  const lines = sanitizedLines(pathChart)
  const indentsAndContents = lines.map(splitByIndent)
  const shallowestIndent = indentsAndContents.reduce(
    (min, { indent }) => Math.min(min, indent),
    Infinity
  )

  const clampedIndents = indentsAndContents.map(({ indent, content }) => ({
    indent: indent - shallowestIndent,
    content
  }))
  const pathsMatchedToAliases = decomposeAliases(clampedIndents)
  const arrayOfAllComposedPaths = fillOutPaths(pathsMatchedToAliases)

  pathsMatchedToAliases.forEach(({ name, index }) => {
    if (!name) {
      return arrayOfAllComposedPaths
    }

    const fullPath = arrayOfAllComposedPaths[index]
    Object.defineProperty(arrayOfAllComposedPaths, name, {
      value: fullPath,
      enumerable: false
    })
  })

  const aliases = pathsMatchedToAliases
    .filter(prop => !!prop?.name)
    .map(prop => prop.name)

  return Object.defineProperty(arrayOfAllComposedPaths, ALIASES_PROP, {
    value: aliases,
    enumerable: false
  })
}

//
// ZIP
//
// (Map one set of composed-paths onto another; see _mock-server/index.js)
//

function zip(keys, values, options) {
  const { aliases = [], ignoreAliases = false } = options || {}
  const useAliases =
    aliases.length && !ignoreAliases ? aliases : keys[ALIASES_PROP]

  return useAliases.reduce((acc, alias) => {
    if (ignoreAliases && aliases.includes(alias)) {
      return acc
    }
    return [...acc, [keys[alias], values[alias]]]
  }, [])
}

//
// HELPERS
//

const rxCRLF = /[\r\n]/
const rxComment = /(\s*\/\/[^\n\r]*)/
const rxLineIndentation = /^( *)([^$]*)/
const rxPathAssignment = /\s*=\s*([^$]+)/
const rxJustWhiteSpace = /^\s*$/

function fillOutPaths(withIndentInfo) {
  const pathStackWithRootFirst = []
  const allComposedPaths = []

  let previousIndent = -1
  let indentationSize = -1

  withIndentInfo.forEach(({ indent, content }) => {
    if (indent <= previousIndent) {
      let count = 1 + (previousIndent - indent) / indentationSize
      while (count--) {
        pathStackWithRootFirst.pop()
      }
    } else if (indentationSize <= 0) {
      indentationSize = indent
    }

    pathStackWithRootFirst.push(content)
    allComposedPaths.push(join(...pathStackWithRootFirst))
    previousIndent = indent
  })

  return allComposedPaths
}

function decomposeAliases(linesIndentMeta) {
  return linesIndentMeta.map((lineMeta, index) => {
    const { content, indent } = lineMeta
    const match = content.match(rxPathAssignment)
    if (!match) {
      return { index, indent, content }
    }

    return {
      index,
      indent,
      content: content.slice(0, content.length - match[0].length),
      name: match[1]
    }
  })
}

function splitByIndent(line) {
  const defaultSplit = [line, '', line]
  const lineSplitByIndentation = line.match(rxLineIndentation) ?? defaultSplit

  return {
    indent: lineSplitByIndentation[1].length,
    content: lineSplitByIndentation[2]
  }
}

function sanitizedLines(strOrArr) {
  return [strOrArr]
    .flat()
    .reduce((acc, line) => [...acc, ...line.split(rxCRLF)], [])
    .filter(notJustWhiteSpace)
    .map(line => line.replace(rxComment, ''))
}

function notJustWhiteSpace(line) {
  return !rxJustWhiteSpace.test(line)
}
