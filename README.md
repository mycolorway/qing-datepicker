# QingDatepicker

[![Latest Version](https://img.shields.io/npm/v/qing-datepicker.svg)](https://www.npmjs.com/package/qing-datepicker)
[![Build Status](https://img.shields.io/travis/mycolorway/qing-datepicker.svg)](https://travis-ci.org/mycolorway/qing-datepicker)
[![Coveralls](https://img.shields.io/coveralls/mycolorway/qing-datepicker.svg)](https://coveralls.io/github/mycolorway/qing-datepicker)
[![David](https://img.shields.io/david/mycolorway/qing-datepicker.svg)](https://david-dm.org/mycolorway/qing-datepicker)
[![David](https://img.shields.io/david/dev/mycolorway/qing-datepicker.svg)](https://david-dm.org/mycolorway/qing-datepicker#info=devDependencies)

QingDatepicker is a simple ui component for selecting date on web page.

## Usage

```html
<script type="text/javascript" src="node_modules/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="node_modules/moment/moment.js"></script>
<script type="text/javascript" src="node_modules/qing-module/dist/qing-module.js"></script>
<script type="text/javascript" src="node_modules/qing-datepicker/dist/qing-datepicker.js"></script>

<input type="date" class="date-field">
```

```js
var qingDatepicker = new QingDatepicker({
  el: '.date-field'
});

qingDatepicker.on('change', function(e) {
  // do something
});
```

## Options

__el__

Selector/Element/jQuery Object, required, specify the html date element.

__placeholder__

String, specify placeholder for input text field.

__format__

String, 'YYYY-MM-DD' by default, specify date format for date field value, please check [momentjs docs](http://momentjs.com/docs/#/parsing/string-format/) for available formats.

__displayFormat__

String, 'LL' by default, specify date format for display, please check [momentjs docs](http://momentjs.com/docs/#/parsing/string-format/) for available formats.

__inputFormats__

Array, default formats are:

```
['YYYY-M-D', 'M/D/YY', 'YYYY年M月D日', 'YYYY.M.D', 'YYYY/M/D']
```

When user directly input date string in text field, QingDatepicker will try to parse the string with these `inputFormats`.

__renderer__

Function, which will be called after component renders. This option can be used to customize html structure.

__popoverOffset__

Number, default is 6, specify popover's offset to the text field.

__locales__

Hash, specify locale config, default config is:

```
{
  selectYear: 'Select Year'
}
```

## Methods

__setDate__ (date)

Set value for datepicker, only momentjs object is accepted.

__getDate__ ()

get current selected date as momentjs object.

__setValue__ (value)

Set value by string.

__getValue__

Get value as formatted date string.

__destroy__ ()

Destroy component, restore element to original state.

## Events

__change__ (date)

Triggered when current selected date is changed.

## Installation

Install via npm:

```bash
npm install --save qing-datepicker
```

## Development

Clone repository from github:

```bash
git clone https://github.com/mycolorway/qing-datepicker.git
```

Install npm dependencies:

```bash
npm install
```

Run default gulp task to build project, which will compile source files, run test and watch file changes for you:

```bash
gulp
```

Now, you are ready to go.

## Publish

When you want to publish new version to npm and bower, please make sure all tests have passed, and you need to do these preparations:

* Add release information in `CHANGELOG.md`. The format of markdown contents will matter, because build scripts will get version and release content from the markdown file by regular expression. You can follow the format of the older releases.

* Put your [personal API tokens](https://github.com/blog/1509-personal-api-tokens) in `/.token.json`(listed in `.gitignore`), which is required by the build scripts to request [Github API](https://developer.github.com/v3/) for creating new release:

```json
{
  "github": "[your github personal access token]"
}
```

Now you can run `gulp publish` task, which will do these work for you:

* Get version number from `CHANGELOG.md` and bump it into `package.json` and `bower.json`.
* Get release information from `CHANGELOG.md` and request Github API to create new release.

If everything goes fine, you can see your release at [https://github.com/mycolorway/qing-module/releases](https://github.com/mycolorway/qing-module/releases). At the End you can publish new version to npm with the command:

```bash
npm publish
```

Please be careful with the last step, because you cannot delete or republish a version on npm.
