# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.3] - 2023-06-06

### Updated

- README tweaks
- Update build dependencies

## [1.2.2] - 2022-04-15

### Removed / Fixed

- Remove `browser` setting from `package.json`; seems to cause issues with CodeSandbox build process, and isn't really necessary since the browser-build is something that's interacted with manually.

## [1.2.1] - 2022-02-07

### Fixed

- Broke ESM imports

## [1.2.0] - 2022-02-06

### Updated

- Basic index.d.ts, document aliases

## [1.1.3] - 2022-01-11

### Fixed

- Fix esbuild + Webpack errors by re-ordering package.json exports

## [1.1.2] - 2022-01-10

### Updated

- Update deps, rebuild

## [1.1.1] - 2021-12-02

### Updated

- Minor perf/mem improvement to zip()

## [1.1.0] - 2021-08-11

### Fixed

- Fix ESM build (import { ... } from 'compose-paths' was not working right)

## [1.0.8] - 2021-06-04

### Updated

- Small refactor for readability

## [1.0.7] - 2021-05-06

### Added

- BundlePhobia shield

### Updated

- Clean-up/comment fillOutPaths()

## [1.0.6] - 2021-05-02

### Fixed

- Remove testing environment-variable from build

## [1.0.5] - 2021-05-02

### Fixed

- Indenting by tab

### Added

- A couple of basic tests

## [1.0.4] - 2021-05-02

### Fixed

- Really fixed CJS module

## [1.0.3] - 2021-05-02

### Fixed

- Fixed CJS module

## [1.0.2] - 2021-05-02

### Fixed

- Wrong homepage link

## [1.0.0] - 2021-05-02

### Added

- compose-paths :)
