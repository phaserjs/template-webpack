# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/webpack-contrib/exports-loader/compare/v1.0.1...v1.1.0) (2020-06-24)


### Features

* "|" character can be used as delimiter for inline string syntax ([#46](https://github.com/webpack-contrib/exports-loader/issues/46)) ([e0bc930](https://github.com/webpack-contrib/exports-loader/commit/e0bc930d84d83107f3d7bf1c761f9af8bca26931))

## [1.0.1](https://github.com/webpack-contrib/exports-loader/compare/v1.0.0...v1.0.1) (2020-06-17)


### Bug Fixes

* better error reporting ([#44](https://github.com/webpack-contrib/exports-loader/issues/44)) ([0397393](https://github.com/webpack-contrib/exports-loader/commit/03973937083d5e7217e74f18bd62b1e7d2615a89))

## [1.0.0](https://github.com/webpack-contrib/exports-loader/compare/v0.7.0...v1.0.0) (2020-06-10)


### ⚠ BREAKING CHANGES

* minimum supported Node.js version is `10.13`
* minimum supported `webpack` version is `4`
* `exports` values moved to the `exports` option, please [read](https://github.com/webpack-contrib/exports-loader#options)
* generates ES module named exports by default (`exports { Foo }`)
* multiple exports in the `inline` syntax were changed, please [read](https://github.com/webpack-contrib/exports-loader#inline)

### Features

* validate options
* support webpack 5
* implemented the `type` option (exports can be CommonsJS or ES module format)
* exports can be described using a string or an object value
* implemented the ability to generate multiple experts
* improved support of `inline` usage


### Bug Fixes

* `export` is not used anymore for CommonJS module format

<a name="0.7.0"></a>
# [0.7.0](https://github.com/webpack-contrib/exports-loader/compare/v0.6.4...v0.7.0) (2018-02-05)


### Features

* **index:** add interpolation support (`loaderUtils.interpolateName`) ([#21](https://github.com/webpack-contrib/exports-loader/issues/21)) ([201de63](https://github.com/webpack-contrib/exports-loader/commit/201de63))
