type TComposedPaths = Array<string> & {
  aliases: Array<string>
  [key: string]: string
}

declare module 'compose-paths' {
  /**
   * @example
   * const paths = composePaths(`
   *
   *   ${__dirname}
   *     /src
   *       /html
   *         /templates      = TEMPLATES
   *         /pages          = PAGES
   *
   *     /public             = PUBLIC
   *       /images           = IMAGES
   *
   * `)
   *
   * paths.TEMPLATES
   * // "/dir/name/src/html/templates"
   *
   * paths.PUBLIC
   * // "/dir/name/public"
   *
   * paths.aliases
   * // ["TEMPLATES", "PAGES", "PUBLIC", "IMAGES"]
   */
  export function composePaths(pathChart: string | string[]): TComposedPaths
}
