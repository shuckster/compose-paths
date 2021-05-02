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

describe('composePaths :: path.join', () => {
  let composePaths
  let zip

  beforeAll(() => {
    process.env.RUNNING_JEST = 'true'
    process.env.BUILD_FOR_NODE = 'false'

    const join = require('url-join')
    const imported = require('../src/compose-paths')
    ;({ composePaths, zip } = imported)

    expect(join).toEqual(composePaths.__join)
  })

  test(`spaces`, () => {
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

  test(`tabs`, () => {
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

  test('shorthand', () => {
    const pathFromRoute = composePaths(`

      /src
        /html
          /pages
            /index.html        = /
            /about.html        = /about
            /contact.html      = /contact

    `)

    expect(pathFromRoute).toEqual([
      '/src',
      '/src/html',
      '/src/html/pages',
      '/src/html/pages/index.html',
      '/src/html/pages/about.html',
      '/src/html/pages/contact.html'
    ])

    expect(pathFromRoute.aliases).toEqual(['/', '/about', '/contact'])

    expect(pathFromRoute['/']).toEqual('/src/html/pages/index.html')
    expect(pathFromRoute['/about']).toEqual('/src/html/pages/about.html')
    expect(pathFromRoute['/contact']).toEqual('/src/html/pages/contact.html')
  })
})
