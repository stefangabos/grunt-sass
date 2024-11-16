# grunt-sass-modern

This is a fork of the original [grunt-sass](https://github.com/sindresorhus/grunt-sass) repository which required a small update  as per [this issue](https://github.com/sindresorhus/grunt-sass/issues/311) after [Dart SASS](https://github.com/sass/dart-sass/tree/main) started emitting the following deprecation warning starting with version `1.79.0`:

_Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0._<br>
_More info: https://sass-lang.com/d/legacy-js-api_

Since the author of the original repository did not provide a fix and still a lot o projects seem to be relying on it, a fix was created by [Matt Robinson](https://github.com/mattyrob) via [this commit](https://github.com/mattyrob/grunt-sass/commit/f6c3e356f70ce4a246bb5df250b0b7a1b7418ca9), and I decided to fork the main repository, add the fix to it, and also update this page about what you can do to properly update your code and not [just silence the warning](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/#silencing-warnings).

## Install

If you are already using the original [grunt-sass](https://github.com/sindresorhus/grunt-sass), edit your `package.json` file and look for something like

```
"grunt-sass": "^3.1.0",
```
...and delete that.

Afterwards, call
```
$ npm install --save-dev grunt-sass-modern
```
...to install the updated version

## Usage

In your `Gruntfile.js`, in the `sass` section, you need to add the `api` entry to the `options` part, and set its value to `"modern"`:

```js
module.exports = function(grunt) {

    const sass = require('sass');

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                api: 'modern'   // this is needed starting with Dart-Sass 1.79.0
                                // (but only working with the updated version of grunt-sass)
            },
            dist: {
                files: {
                    'main.css': 'main.scss'
                }
            }
        }
    });

    // remember to also update this from "grunt-sass" to "grunt-sass-modern"!
    grunt.loadNpmTasks('grunt-sass-modern');

    grunt.registerTask('default', ['sass']);

}
```



Since this is a fork of the original [grunt-sass](https://github.com/sindresorhus/grunt-sass) repository you can read more about usage and options on the [original project's page](https://github.com/sindresorhus/grunt-sass).