'use strict'
var Docxtemplater = require('docxtemplater');
var path = require('path');
var fs = require('fs');

/*
 * <<<***** The Usage *****>>>
 * 1. dependencies: docxtemplater
 * https://github.com/open-xml-templating/docxtemplater
 *
 * 1. Arguments
 * This module accept two arguments
 * 'template': MUST be the full path of a template docx file
 * 'dataSet': the data structure that containing the key: value pairs
 * to be filled in the docx template
 *
 * 2. Returned object
 * The parsed docx content will be returned
 * in a node buffer, which variable name is 'buf'.
 *
 * 3. Create the rendered docx file
 * This buffer can be write to file system 
 * by fs.writeFileSync(filename, buf);
 *
 */

module.exports = function ( template, dataSet ) {
  var tplContent = fs.readFileSync( template, 'binary' );
  var output = new Docxtemplater(tplContent);
  output.setData(dataSet);
  output.render();
  var buf = output.getZip()
                  .generate({ type: 'nodebuffer' });
  return buf;
};
