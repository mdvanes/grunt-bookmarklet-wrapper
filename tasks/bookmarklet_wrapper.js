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
     - add optional "banner". banner is appended at the end, because it will conflict with the ```javascript:``` prefix
     - add optional "banner_prefix". banner_prefix is prepended and must not contain newlines
     - add optional "as_json": true. output will be a json {"href":"bookmarklet"} for generic loading in webapps

     add executability test of generated code?
     */


    grunt.registerMultiTask('bookmarklet_wrapper', 'Escape, concatenate and wrap JavaScript files to be executed as a bookmarklet.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            banner: '',
            banner_prefix: '',
            as_json: false
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

            // Add prefix to source (eg a banner to read the tooltip, must not contain newlines)
            if (options.prefix_banner) {
                src = prefix + src;
            }

            // Wrap in bookmarklet wrapper
            src = 'javascript:(function(){' + src + '})();';
            
            if (options.as_json) {
                js_src = {
                    "href": src
                };
                src = JSON.stringify(js_src);
            }

            // Append banner
            src += options.banner;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
