## version 3.3.0 (November 17, 2024)

- fixed broken source map generation which was not working in the original grunt-sass since likely since Sass version 1.48.0; this fix restores functionality of the `sourceMap` option to its original form - [read more](https://github.com/stefangabos/grunt-sass-modern?tab=readme-ov-file#heads-up-regarding-the-sourcemap-attribute) about it

## version 3.2.0 (November 16, 2024)

- fixed issue after Sass started emitting deprecation warnings starting with version 1.79.0 because it looks like the [original repository](https://github.com/sindresorhus/grunt-sass) is abandoned
