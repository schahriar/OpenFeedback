'use strict'

var fs = require('fs');
var path = require('path');
var render = require('jsdoc-to-markdown');
var stream = fs.createWriteStream("./documentation/API.md");

render({
    src: [path.resolve(__dirname, '../core/', 'OpenFeedback.js')],
    separators: true
}).pipe(stream);