![Build Status](https://travis-ci.org/mdvanes/grunt-bookmarklet-wrapper.svg?branch=master) [![npm version](https://badge.fury.io/js/grunt-bookmarklet-wrapper.svg)](https://badge.fury.io/js/grunt-bookmarklet-wrapper)

# grunt-bookmarklet-wrapper

> Grunt task to urlencode, concatenate and wrap JavaScript files to prepare for execution as a bookmarklet.

There is also a grunt plugin [grunt-bookmarklet-thingy](https://github.com/justspamjustin/grunt-bookmarklet-thingy), but it is has no documentation and I have no
idea what it does exactly. Also I needed certain features so I wrote this new plugin.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bookmarklet-wrapper --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bookmarklet-wrapper');
```

Although I recommend using [load-grunt-tasks](https://www.npmjs.com/package/load-grunt-tasks)

## The "bookmarklet_wrapper" task

### Overview
In your project's Gruntfile, add a section named `bookmarklet_wrapper` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bookmarklet_wrapper: {
    options: {
      // Task-specific options go here.
      banner: '\n/*! <%= pkg.name %> by <%= pkg.author.name %> */'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      files: {
        'foo-bookmarklet.js': ['foo1.js', 'foo2.js']
      }
    },
  },
});
```

Example output:

```js
javascript:(function(){alert('foo%20bar');})();
```

### Properties

#### files
A key/value pair is accepted. The key is the path to the output file as a String, the value an array of
Strings, the paths of the input files that will be urlencoded and concatenated.

### Options

#### options.banner
Type: `String`
Default value: `''`

A string value that is appended as banner. The banner is appended to the generated code, because it will conflict with the
```javascript:``` prefix if it is prepended.

### Usage Examples

#### Default Options
In this example, the fixture files are urlencoded and concatenated. Then they are wrapped in an script-targed url IIFE.
So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`,
the generated result would be `javascript:(function(){Testing1%202%203})();`.

```js
grunt.initConfig({
    bookmarklet_wrapper: {
        default_options: {
            files: {
                'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
            }
        }
    }
});
```

#### Custom Options
In this example, an option is added to append a banner to the processed code.

```js
grunt.initConfig({
    bookmarklet_wrapper: {
        custom_options: {
            options: {
                banner: '\r\n/*! <%= pkg.name %> by <%= pkg.author.name %> */'
            },
            files: {
                'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
            }
        }
    }
});
```

## Contributing
Follow the jshintrc settings for the code style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-04-25    v1.0.0     Extended and successfully ran unit tests. It's not required to remove inline comments (//),
                           code after line breaks is still executed. There doesn't seem to be a way to programmatically
                           test script-targeted urls, but manual tests were successful.
* 2015-04-25    v0.2.0     Minor fixes, documentation updates
* 2015-04-25    v0.1.0     Initial release
