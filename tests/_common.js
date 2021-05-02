const PATHS = `
  /dist/bookmarklet
    /main.js                        = BOOKMARKLET_LOADER
    /main.js.map                    = BOOKMARKLET_LOADER_MAP

    /ui.js                          = UI
    /ui.js.map                      = UI_MAP
    /ui.css                         = UI_CSS
    /statement.css                  = STATEMENT_CSS

    /plugins.js                     = PLUGINS_REGISTRY
    /plugins
      /hsbc-uk.js                   = HSBC_PLUGIN
      /hsbc-uk.js.map               = HSBC_PLUGIN_MAP

  /src
    /_mock-server
      /public
        /index.html                 = HOME
        /index.html                 = INDEX
        /index.html                 = CHROME
        /debug.html                 = DEBUG

        /hsbc/full/store.json       = FULL_MOCK

        /hsbc/fixtures
          /rtrvAcctSumm.json        = ACCOUNT_SUMMARY
          /rtrvStmtAcctList.json    = STATEMENT_ACCOUNT_LIST
          /rtrvStmtDetl.json        = STATEMENT_DETAIL

    /common
      /bus.js                       = BUS
      /ajacks.js                    = AJAX_HIJACK
      /hsbc.js                      = HSBC_HIJACK

    /bookmarklet.js                 = DEBUG_BOOKMARKLET
`
const ROUTES = `
  /                                   = HOME
    /index.html                       = INDEX
    /chrome.html                      = CHROME
    /main.js                          = BOOKMARKLET_LOADER
    /main.js.map                      = BOOKMARKLET_LOADER_MAP

    /ui.js                            = UI
    /ui.js.map                        = UI_MAP
    /ui.css                           = UI_CSS
    /statement.css                    = STATEMENT_CSS

    /plugins.js                       = PLUGINS_REGISTRY
    /plugins
      /hsbc-uk.js                     = HSBC_PLUGIN
      /hsbc-uk.js.map                 = HSBC_PLUGIN_MAP

  /debug                              = DEBUG
    /bookmarklet.js                   = DEBUG_BOOKMARKLET

  /lib
    /bus.js                           = BUS
    /ajacks.js                        = AJAX_HIJACK
    /hsbc.js                          = HSBC_HIJACK

  /hsbc/full/store.json               = FULL_MOCK

  /gpib/channel/proxy/accountDataSvc
    /rtrvAcctSumm                     = ACCOUNT_SUMMARY
    /rtrvStmtAcctList                 = STATEMENT_ACCOUNT_LIST
    /rtrvStmtDetl                     = STATEMENT_DETAIL
`

const COMPOSED_PATHS = [
  '/dist/bookmarklet',
  '/dist/bookmarklet/main.js',
  '/dist/bookmarklet/main.js.map',
  '/dist/bookmarklet/ui.js',
  '/dist/bookmarklet/ui.js.map',
  '/dist/bookmarklet/ui.css',
  '/dist/bookmarklet/statement.css',
  '/dist/bookmarklet/plugins.js',
  '/dist/bookmarklet/plugins',
  '/dist/bookmarklet/plugins/hsbc-uk.js',
  '/dist/bookmarklet/plugins/hsbc-uk.js.map',
  '/src',
  '/src/_mock-server',
  '/src/_mock-server/public',
  '/src/_mock-server/public/index.html',
  '/src/_mock-server/public/index.html',
  '/src/_mock-server/public/index.html',
  '/src/_mock-server/public/debug.html',
  '/src/_mock-server/public/hsbc/full/store.json',
  '/src/_mock-server/public/hsbc/fixtures',
  '/src/_mock-server/public/hsbc/fixtures/rtrvAcctSumm.json',
  '/src/_mock-server/public/hsbc/fixtures/rtrvStmtAcctList.json',
  '/src/_mock-server/public/hsbc/fixtures/rtrvStmtDetl.json',
  '/src/common',
  '/src/common/bus.js',
  '/src/common/ajacks.js',
  '/src/common/hsbc.js',
  '/src/bookmarklet.js'
]

const COMPOSED_PATHS_ALIASES = [
  'BOOKMARKLET_LOADER',
  'BOOKMARKLET_LOADER_MAP',
  'UI',
  'UI_MAP',
  'UI_CSS',
  'STATEMENT_CSS',
  'PLUGINS_REGISTRY',
  'HSBC_PLUGIN',
  'HSBC_PLUGIN_MAP',
  'HOME',
  'INDEX',
  'CHROME',
  'DEBUG',
  'FULL_MOCK',
  'ACCOUNT_SUMMARY',
  'STATEMENT_ACCOUNT_LIST',
  'STATEMENT_DETAIL',
  'BUS',
  'AJAX_HIJACK',
  'HSBC_HIJACK',
  'DEBUG_BOOKMARKLET'
]

const COMPOSED_ROUTES = [
  '/',
  '/index.html',
  '/chrome.html',
  '/main.js',
  '/main.js.map',
  '/ui.js',
  '/ui.js.map',
  '/ui.css',
  '/statement.css',
  '/plugins.js',
  '/plugins',
  '/plugins/hsbc-uk.js',
  '/plugins/hsbc-uk.js.map',
  '/debug',
  '/debug/bookmarklet.js',
  '/lib',
  '/lib/bus.js',
  '/lib/ajacks.js',
  '/lib/hsbc.js',
  '/hsbc/full/store.json',
  '/gpib/channel/proxy/accountDataSvc',
  '/gpib/channel/proxy/accountDataSvc/rtrvAcctSumm',
  '/gpib/channel/proxy/accountDataSvc/rtrvStmtAcctList',
  '/gpib/channel/proxy/accountDataSvc/rtrvStmtDetl'
]

const COMPOSED_ROUTES_ALIASES = [
  'HOME',
  'INDEX',
  'CHROME',
  'BOOKMARKLET_LOADER',
  'BOOKMARKLET_LOADER_MAP',
  'UI',
  'UI_MAP',
  'UI_CSS',
  'STATEMENT_CSS',
  'PLUGINS_REGISTRY',
  'HSBC_PLUGIN',
  'HSBC_PLUGIN_MAP',
  'DEBUG',
  'DEBUG_BOOKMARKLET',
  'BUS',
  'AJAX_HIJACK',
  'HSBC_HIJACK',
  'FULL_MOCK',
  'ACCOUNT_SUMMARY',
  'STATEMENT_ACCOUNT_LIST',
  'STATEMENT_DETAIL'
]

const PATHS_AND_ROUTES_ZIPPED = [
  ['/chrome.html', '/src/_mock-server/public/index.html'],
  ['/main.js', '/dist/bookmarklet/main.js'],
  ['/main.js.map', '/dist/bookmarklet/main.js.map'],
  ['/ui.js', '/dist/bookmarklet/ui.js'],
  ['/ui.js.map', '/dist/bookmarklet/ui.js.map'],
  ['/ui.css', '/dist/bookmarklet/ui.css'],
  ['/statement.css', '/dist/bookmarklet/statement.css'],
  ['/plugins.js', '/dist/bookmarklet/plugins.js'],
  ['/plugins/hsbc-uk.js', '/dist/bookmarklet/plugins/hsbc-uk.js'],
  ['/plugins/hsbc-uk.js.map', '/dist/bookmarklet/plugins/hsbc-uk.js.map'],
  ['/debug', '/src/_mock-server/public/debug.html'],
  ['/lib/bus.js', '/src/common/bus.js'],
  ['/lib/ajacks.js', '/src/common/ajacks.js'],
  ['/lib/hsbc.js', '/src/common/hsbc.js'],
  ['/hsbc/full/store.json', '/src/_mock-server/public/hsbc/full/store.json'],
  [
    '/gpib/channel/proxy/accountDataSvc/rtrvAcctSumm',
    '/src/_mock-server/public/hsbc/fixtures/rtrvAcctSumm.json'
  ],
  [
    '/gpib/channel/proxy/accountDataSvc/rtrvStmtAcctList',
    '/src/_mock-server/public/hsbc/fixtures/rtrvStmtAcctList.json'
  ],
  [
    '/gpib/channel/proxy/accountDataSvc/rtrvStmtDetl',
    '/src/_mock-server/public/hsbc/fixtures/rtrvStmtDetl.json'
  ]
]

const oneTabFor2Spaces = str => str.replace(/ {2}/g, '\t')

module.exports = {
  PATHS,
  COMPOSED_PATHS,
  COMPOSED_PATHS_ALIASES,

  ROUTES,
  COMPOSED_ROUTES,
  COMPOSED_ROUTES_ALIASES,

  PATHS_AND_ROUTES_ZIPPED,

  oneTabFor2Spaces
}
