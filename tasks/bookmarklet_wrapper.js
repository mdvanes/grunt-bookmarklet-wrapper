/*
 * grunt-bookmarklet-wrapper
 * https://github.com/m.van.es/grunt-bookmarklet-wrapper
 *
 * Copyright (c) 2015 M.D. van Es
 * Licensed under the MIT license.
 */
/* jshint scripturl:true */

'use strict';

module.exports = function (grunt) {

    /*
     - concatenate a list of files without adding newlines. (no uglify) - the use is to append code that is only for running the code as a bookmarklet
     - urlencode the result
     - wrap in ```javascript:(function(){ ... })();```
     - add optional "banner". banner is prepended and must not contain newlines

     add executability test of generated code?
     */

    grunt.registerMultiTask('bookmarklet_wrapper', 'Escape, concatenate and wrap JavaScript files to be executed as a bookmarklet.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            banner: '',
            asJson: false
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                var content = grunt.file.read(filepath);
                // Url encode file content
                return encodeURI(content);
            }).join('');

            // Add prefix to source (e.g. a banner to read the tooltip, must not contain newlines)
            if (options.banner) {
                src = options.banner + src;
            }

            // Wrap in bookmarklet wrapper
            src = 'javascript:(function(){' + src + '})();';

            // TODO remove asJson feature
            if (options.asJson) {
                var jsSrc = {
                    'href': src
                };
                src = JSON.stringify(jsSrc);
            }

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
