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
  // prep
  const lines = sanitizedLines(pathChart)
  const indentsAndContents = lines.map(splitByIndent)
  const shallowestIndent = indentsAndContents.reduce(minIndent, Infinity)
  const clampedIndents = indentsAndContents.map(ClampIndent(shallowestIndent))
  const pathsMatchedToAliases = decomposeAliases(clampedIndents)
  const arrayOfAllComposedPaths = fillOutPaths(pathsMatchedToAliases)

  // build output
  const aliases = pathsMatchedToAliases.map(path => path?.name).filter(Boolean)
  const output = arrayOfAllComposedPaths

  pathsMatchedToAliases.forEach(AssignAlias(output))

  return Object.defineProperty(output, ALIASES_PROP, {
    value: aliases,
    enumerable: false
  })
}

if (process.env.RUNNING_JEST === 'true') {
  composePaths.__join = join
}

//
// ZIP
//
// (Map one set of composed-paths onto another)
//

function zip(keys, values, options) {
  const { aliases = [], ignoreAliases = false } = options || {}
  const useAliases =
    aliases.length && !ignoreAliases ? aliases : keys[ALIASES_PROP]

  return useAliases.reduce((acc, alias) => {
    if (!(ignoreAliases && aliases.includes(alias))) {
      acc.push([keys[alias], values[alias]])
    }
    return acc
  }, [])
}

//
// HELPERS
//

const rxCRLF = /[\r\n]/
const rxComment = /(\s*\/\/[^\n\r]*)/
const rxLineIndentation = /^(\s*)([^$]*)/
const rxPathAssignment = /\s*=\s*([^$]+)/
const rxJustWhiteSpace = /^\s*$/

function minIndent(min, { indent }) {
  return Math.min(min, indent)
}

function ClampIndent(shallowestIndent) {
  return ({ indent, content }) => ({
    indent: indent - shallowestIndent,
    content
  })
}

function AssignAlias(arrayOfAllComposedPaths) {
  return ({ name, index }) => {
    if (!name) {
      return arrayOfAllComposedPaths
    }

    const fullPath = arrayOfAllComposedPaths[index]
    Object.defineProperty(arrayOfAllComposedPaths, name, {
      value: fullPath,
      enumerable: false
    })
  }
}

function fillOutPaths(withIndentInfo) {
  const pathStackWithRootFirst = []
  const allComposedPaths = []

  let previousIndent = -1
  let tabSize = -1

  withIndentInfo.forEach(({ indent, content }) => {
    // The first indent encountered gives the "tab size"
    if (tabSize <= 0) {
      tabSize = indent
    }
    // Encountered a smaller indent than the previous? Pop the stack
    else if (indent <= previousIndent) {
      let count = 1 + (previousIndent - indent) / tabSize
      while (count--) {
        pathStackWithRootFirst.pop()
      }
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
