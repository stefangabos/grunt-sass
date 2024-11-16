# grunt-sass-modern

### Compile Sass to CSS using [Dart Sass](http://sass-lang.com/dart-sass) or [Node Sass](https://github.com/sass/node-sass) (deprecated).

This is a fork of the original [grunt-sass](https://github.com/sindresorhus/grunt-sass) repository which required a small update  as per [this issue](https://github.com/sindresorhus/grunt-sass/issues/311) after [Dart SASS](https://github.com/sass/dart-sass/tree/main) started emitting the following deprecation warning starting with version `1.79.0`:

>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0._<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_More info: https://sass-lang.com/d/legacy-js-api_

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

Everything in your `Gruntfile.js` should stay pretty much the same, the only addition will be the `api` entry in the `options` part, which needs to be set to `"modern"`:

```js
const sass = require('sass');

require('load-grunt-tasks')(grunt);

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

grunt.registerTask('default', ['sass']);
```

Since this is a fork of the original [grunt-sass](https://github.com/sindresorhus/grunt-sass) repository you can read more about usage and options on the [original project's page]((https://github.com/sindresorhus/grunt-sass)).