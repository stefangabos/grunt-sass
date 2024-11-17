/* eslint-disable prefer-object-spread, promise/prefer-await-to-then */
'use strict';
const util = require('util');
const path = require('path');

module.exports = grunt => {
    grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {

        const done = this.async();
        const options = this.options({
            precision: 10
        });

        let filePath = '';

        if (!options.implementation) {
            grunt.fatal('The implementation option must be passed to the Sass task');
        }
        grunt.verbose.writeln(`\n${options.implementation.info}\n`);

        (async () => {
            await Promise.all(this.files.map(async item => {
                const [src] = item.src;
                let result;

                if (!src || path.basename(src)[0] === '_') {
                    return;
                }

                if (options.api === 'modern') {
                    result = await options.implementation.compileAsync(src, options);
                } else {
                    result = await util.promisify(options.implementation.render)(Object.assign({}, options, {
                        file: src,
                        outFile: item.dest
                    }));
                }

                if (options.sourceMap) {
                    filePath = options.sourceMap === true ? `${item.dest}.map` : options.sourceMap;
                    grunt.file.write(filePath, JSON.stringify(result.sourceMap));
                }

                if (options.sourceMap) {
                    result.css = '/*# sourceMappingURL=' + path.basename(filePath) + '*/' + "\n" + result.css;
                }

                grunt.file.write(item.dest, result.css);

            }));
        })().catch(error => {
            grunt.fatal(error.formatted || error);
        }).then(done);
    });
};
