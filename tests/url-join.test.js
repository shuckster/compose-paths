const {
  PATHS,
  COMPOSED_PATHS,
  COMPOSED_PATHS_ALIASES,
  ROUTES,
  COMPOSED_ROUTES,
  COMPOSED_ROUTES_ALIASES,
  PATHS_AND_ROUTES_ZIPPED,
  oneTabFor2Spaces
} = require('./_common')

test(`composePaths :: url-join / spaces`, () => {
  process.env.RUNNING_JEST = 'true'
  process.env.BUILD_FOR_NODE = 'false'

  const join = require('url-join')
  const { composePaths, zip } = require('../src/compose-paths')
  expect(join).toEqual(composePaths.__join)

  const paths = composePaths(PATHS)
  expect(paths).toEqual(COMPOSED_PATHS)
  expect(paths.aliases).toEqual(COMPOSED_PATHS_ALIASES)

  const routes = composePaths(ROUTES)
  expect(routes).toEqual(COMPOSED_ROUTES)
  expect(routes.aliases).toEqual(COMPOSED_ROUTES_ALIASES)

  const staticRoutes = zip(routes, paths, {
    aliases: ['DEBUG_BOOKMARKLET', 'INDEX', 'HOME'],
    ignoreAliases: true
  })

  expect(staticRoutes).toEqual(PATHS_AND_ROUTES_ZIPPED)
})

test(`composePaths :: url-join / tabs`, () => {
  process.env.RUNNING_JEST = 'true'
  process.env.BUILD_FOR_NODE = 'false'

  const join = require('url-join')
  const { composePaths, zip } = require('../src/compose-paths')
  expect(join).toEqual(composePaths.__join)

  const paths = composePaths(oneTabFor2Spaces(PATHS))
  expect(paths).toEqual(COMPOSED_PATHS)
  expect(paths.aliases).toEqual(COMPOSED_PATHS_ALIASES)

  const routes = composePaths(oneTabFor2Spaces(ROUTES))
  expect(routes).toEqual(COMPOSED_ROUTES)
  expect(routes.aliases).toEqual(COMPOSED_ROUTES_ALIASES)

  const staticRoutes = zip(routes, paths, {
    aliases: ['DEBUG_BOOKMARKLET', 'INDEX', 'HOME'],
    ignoreAliases: true
  })

  expect(staticRoutes).toEqual(PATHS_AND_ROUTES_ZIPPED)
})
