'use strict'
const fs = require('fs'),
      path = require('path'),
      XLSX = require('xlsx-template');

/*
 * Usage:
 * 1. argv
 * template: must be a FULL path of xlsx template
 * dataSet: key-value pairs object
 *
 */

module.exports = function( template, dataSet ) {
  var templateContent = fs.readFileSync( template );
  var xlsxTemplate = new XLSX( templateContent );
  var sheetNumber = 1;

  xlsxTemplate.substitute( sheetNumber, dataSet );
  var buf = xlsxTemplate.generate();
  return buf;
  // Specify 'binary' mode 
  // when writing the buf to file system:
  // fs.writeFileSync('ttt.xlsx', dataBuffer, 'binary');
};
