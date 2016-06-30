'use strict'
var processor = require('../libs/docx-processor');
var dataSet = {
  't': 'This is title',
  'r': 'This is revision'
};
var template = __dirname + '/test-tpl.docx'
var name = processor(template, dataSet);
console.log(name);
