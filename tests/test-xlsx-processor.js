'use strict'
var xlsxProcessor = require('../libs/xlsx-processor');
var path = require('path');
var fs = require('fs');
console.log('***** DEBUG *****');

var template = path.join( __dirname, 'check_record.xlsx' );

var dataSet = {};
dataSet['r'] = 'A';
dataSet['d_b'] = '周海';
dataSet['c_b'] = '褚瑞';
dataSet['r_b'] = '赵远洋';
dataSet['a_b'] = '刘静波'; 
dataSet['t'] = 'ESF Actuation Cabinet Software Diagram Train B';
dataSet['i_s'] = 'E10-P10-98999';
// dataSet['i_19'] = req.query.index_19;
dataSet['pages'] = '20';
dataSet['date'] = '2016-07-01';

var buf = xlsxProcessor( template, dataSet );
fs.writeFileSync('output.xlsx', buf, 'binary');
