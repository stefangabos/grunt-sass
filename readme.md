# grunt-sass-modern

### Compile SASS to CSS using modern Dart Sass

[![npm](https://img.shields.io/npm/v/grunt-sass-modern.svg)](https://www.npmjs.com/package/grunt-sass-modern) [![Total](https://img.shields.io/npm/dt/grunt-sass-modern.svg)](https://www.npmjs.com/package/grunt-sass-modern) [![Monthly](https://img.shields.io/npm/dm/grunt-sass-modern.svg)](https://www.npmjs.com/package/grunt-sass-modern) [![License](https://img.shields.io/npm/l/grunt-sass-modern.svg)](https://github.com/stefangabos/grunt-sass-modern/blob/master/LICENSE.md)

This modern fork of [grunt-sass](https://github.com/sindresorhus/grunt-sass) addresses the [issue](https://github.com/sindresorhus/grunt-sass/issues/311) introduced in Dart Sass [1.79.0](https://github.com/sass/dart-sass/releases/tag/1.79.0)+, including fixing the cause of the deprecation warnings and broken source maps (which were broken since at least Sass [1.48.0](https://github.com/sass/dart-sass/releases/tag/1.48.0)).

It is a seamless drop-in replacement of the original designed to modernize your workflow without sacrificing stability.

Since the author of the original repository did not provide a fix and still a lot o projects are relying on it, a fix was created by [Matt Robinson](https://github.com/mattyrob) via [this commit](https://github.com/mattyrob/grunt-sass/commit/f6c3e356f70ce4a246bb5df250b0b7a1b7418ca9), and I decided to fork the main repository, add the fix to it and also update this page about what you can do to properly update your code and not [just silence the warning](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/#silencing-warnings).


## Why use this fork

Switching to `grunt-sass-modern` fork provides:

- **compatibility fixes**: resolves the cause of Dart Sass 1.79.0+ deprecation warnings
- **fixes broken source maps**: fixes issues with broken source maps since at least Sass 1.48.0
- **modern approach**: aligned with the latest Sass ecosystem

Key features

- drop-in replacement for `grunt-sass`
- seamless integration with existing Grunt workflows
- regular updates for compatibility and performance

## Deprecation warning in Dart Sass 1.79.0+

This fork fixes (among other things) the cause of the following deprecation warning when using the original grunt-sass:

_Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0._<br>
_More info: https://sass-lang.com/d/legacy-js-api_

## Install

If you are already using the original [grunt-sass](https://github.com/sindresorhus/grunt-sass), edit your `package.json` file and look for something like

```bash
"grunt-sass": "^3.1.0",
```
...and delete that.

To install `grunt-sass-modern` run

```bash
$ npm install grunt-sass-modern --save-dev
```

## Usage

In your `Gruntfile.js`, in the `sass` section, you need to add the `api` entry to the `options` part, and set its value to `"modern"`:

```js
module.exports = function(grunt) {

    const sass = require('sass');

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,    // broken in "grunt-sass" for versions of SASS newer than 1.48.0
                api: 'modern'       // this is required starting with Dart-Sass 1.79.0
                                    // (and only working with grunt-sass-modern)
            },
            dist: {
                files: {
                    'destination.css': 'source.scss'
                }
            }
        }
    });

    // remember to also update this from "grunt-sass" to "grunt-sass-modern"!
    grunt.loadNpmTasks('grunt-sass-modern');
    grunt.registerTask('default', ['sass']);

}
```

## Some options have changed in the `modern` API

> Note than when switching to the `modern` API, most of the [options available in legacy mode](https://sass-lang.com/documentation/js-api/interfaces/legacysharedoptions/) will not work anymore like, for example, `indentType` and `indentWidth`, while other have been renamed, like `outputStyle` which became `style`.<br><br>
> Thus, make sure yo look into the [available options](https://sass-lang.com/documentation/js-api/interfaces/options/) when switching to the `modern` API.

## Silencing the warning

If for whatever reason you are not able to update your code and you just want to silence the warning as in the example below

```js
module.exports = function(grunt) {

    const sass = require('sass');

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                silenceDeprecations: ['legacy-js-api']	// this is needed in order to silence the deprecation warning
            },
            dist: {
                files: {
                    'destination.css': 'source.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass-modern');
    grunt.registerTask('default', ['sass']);

}
```

## Fixing the `sourceMap` attribute

Note that in the [original repo](https://github.com/sindresorhus/grunt-sass), `sourceMap` generation is broken and it is fixed in `grunt-sass-modern`.

The caviat is that the newer versions of Sass **do not add a sourceMappingURL comment to the generated CSS** by default!

Excerpt from their [docs](https://sass-lang.com/documentation/js-api/interfaces/options/#sourceMap):

> Sass doesn't automatically add a `sourceMappingURL` comment to the generated CSS. It's up to callers to do that, since callers have full knowledge of where the CSS and the source map will exist in relation to one another and how they'll be served to the browser.

`grunt-sass-modern` fixes this by automatically adding the `sourceMappingURL` comment to your compiled CSS, and making the `sourceMap` option work as it used to in [legacy mode](https://sass-lang.com/documentation/js-api/interfaces/legacysharedoptions/#sourceMap) of Sass:

```js
module.exports = function(grunt) {

    const sass = require('sass');

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,

                // use it like this to create the map where destination.css resides
                // (and write the sourceMappingURL comment in to the destination.css)
                sourceMap: true,

                // use it like this to create the map at given path
                // (and write the sourceMappingURL comment in to the destination.css)
                sourceMap: 'path/to/map',

                files: {
                    'destination.css': 'source.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass-modern');
    grunt.registerTask('default', ['sass']);

}
```

## Options

See the Dart Sass [options](https://sass-lang.com/documentation/js-api/interfaces/options/).

For more information please refer to the original [grunt-sass](https://github.com/sindresorhus/grunt-sass) repository.
