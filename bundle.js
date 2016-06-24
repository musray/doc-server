'use strict'
var AdmZip = require('adm-zip');
var fs = require('fs');
var async = require('async');
var path = require('path');
var zip = new AdmZip();
var files = fs.readdirSync(__dirname + '/output');

function bundleFiles (files, today) {
  var zip = new AdmZip();
  var bundleZipFile;
  async.eachSeries(files, function(file, callback) {
    zip.addLocalFile(path.join(__dirname, 'output', file));
    callback();
  }, function(err) {
    if (err) console.log(err);
    bundleZipFile = __dirname + '/output/' + today + '_bundle.zip';
    zip.writeZip(bundleZipFile);
  });
  return bundleZipFile;
}

bundleFiles(files, '2016-06-23');
