# composePaths

<p>
  <a href="https://github.com/shuckster/compose-paths/blob/master/LICENSE">
    <img
      alt="MIT license"
      src="https://img.shields.io/npm/l/compose-paths?style=plastic"
    /></a>
  <a href="https://bundlephobia.com/result?p=compose-paths">
    <img
      alt="npm bundle size"
      src="https://img.shields.io/bundlephobia/minzip/compose-paths?style=plastic"
    /></a>
  <a href="https://www.npmjs.com/package/compose-paths">
    <img
      alt="Version"
      src="https://img.shields.io/npm/v/compose-paths?style=plastic"
    /></a>
</p>

```sh
$ pnpm i compose-paths
```

## Usage

### `Path` &rarr; `Alias`

```js
const { composePaths } = require('compose-paths')

const paths = composePaths(`

  ${__dirname}
    /src
      /html
        /templates      = TEMPLATES
        /pages          = PAGES

    /public             = PUBLIC
      /images           = IMAGES

`)

paths.TEMPLATES
// "/dir/name/src/html/templates"

paths.PUBLIC
// "/dir/name/public"
```

### `Path` &rarr; `Route` (via aliases)

You can also zip-up two of these:

```js
const { composePaths, zip } = require('compose-paths')

const routes = composePaths(`
    /                   = HOME
    /about              = ABOUT
    /contact            = CONTACT
`)

const paths = composePaths(`
  ${__dirname}
    /src
      /html/pages
        /index.html     = HOME
        /about.html     = ABOUT
        /contact.html   = CONTACT
`)

const staticRoutes = zip(routes, paths)

// Then, for example:
staticRoutes.forEach(([route, path]) => {
  app.get(route, sendFile(path))
})
```

### `Path` &rarr; `Route` (directly)

```js
const { composePaths } = require('compose-paths')

const pathFromRoute = composePaths(`

  ${__dirname}
    /src/html/pages
      /index.html        = /
      /about.html        = /about
      /contact.html      = /contact

`)

pathFromRoute['/']
// "/dir/name/src/html/pages/index.html"

pathFromRoute['/contact']
// "/dir/name/src/html/pages/contact.html"

pathFromRoute.aliases.forEach(route => {
  console.log(pathFromRoute[route])
})
```

That's it!

Behind the scenes `compose-paths` looks at the indentation-level of its input as the cue to concatenate lines together. Either `tabs` or `spaces` should be fine, so long as you're consistent.

# Credits

`compose-paths` was written by [Conan Theobald](https://github.com/shuckster/).

Did you find this useful? If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
