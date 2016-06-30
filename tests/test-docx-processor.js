'use strict'
var fs = require('fs');
var path = require('path');
var processor = require('../libs/docx-processor');
var dataSet = {
  't': '二手玫瑰 伎俩 歌词',
  'r': 'This is revision'
};
var template = __dirname + '/test-tpl.docx'
var docBuf = processor(template, dataSet);
var outputFileName = __dirname + '/' + dataSet.t + path.extname(template);
fs.writeFileSync(outputFileName, docBuf);
console.log('File is saved!');
