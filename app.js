'use strict'
const fs = require('fs'),
      express = require('express'),
      engines = require('consolidate'),
      morgan = require('morgan'),
      async = require('async'),
      formatedDT = require('./libs/format-dt.js'),
      path = require('path'),
      zip = require('express-zip'),
      XLSX = require('xlsx-template'),
      genDocList = require('./libs/gen-doc-list.js'),
      xlsxProcessor = require('./libs/xlsx-processor'),
      docxProcessor = require('./libs/docx-processor');

// set up express application
const app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(morgan('combined'));

// get request for root '/'
app.get('/', function(req, res) {
  res.render('index');
});

// get request for /GET
// main bussness logic
app.get('/GET', function(req, res) {

  // create formated date and time string
  // can be used at any place where 
  // need current date or time
  Date.prototype.formatedDate = formatedDT.formatedDate;
  var today = new Date();

  // DATASET will be used in docx-templating
  var dataSet = {};
  dataSet['r'] = req.query.rev;
  dataSet['d_b'] = req.query.draft;
  dataSet['c_b'] = req.query.check;
  dataSet['r_b'] = req.query.review;
  dataSet['a_b'] = req.query.approve; 
  dataSet['t'] = req.query.title;
  dataSet['i_s'] = req.query.index_short;
  dataSet['i_19'] = req.query.index_19;
  dataSet['pages'] = req.query.pages;
  dataSet['date'] = today.formatedDate('-');
  // splite index_19 into a list of each digit.
  var index_19 = req.query.index_19;
  for ( let m = 0; m < req.query.index_19.length; m++ ) {
    let no = 'i' + m;
    dataSet[no] = index_19[m]
  }
  // Applicable to CPR1000
  // TODO for other projetcs
  dataSet['observation'] = 
    req.query.rev.toLowerCase() == 'a' ? 'First issue' 
                                       : 'Revised according to design progress';

  // documentCategory is direvied from webpage
  // it might equals to 'ied', 'cin', 'iics', etc.
  var documentCategory = req.query.documents;
  var projectPath = '/' + req.query.projects;

  // This docsToGen will be produced by function
  // genDocList( documentCategory )
  // A list of templates might be created
  // in a form of [ 'sw_check_list.xlsx', 'ied_cover.docx', 'check_record.xlsx' ]
  // var docsToGen = genDocList( documentCategory );
  
  var docsToGen = [ 'ied_cover.docx',
                    'sw_check_list.docx',
                    'cin_cover.xlsx' ]
  
  // Use "generatedFiles" to collect the name of created docs
  // Then used in "res.zip" method to gathering
  // docs to download.
  var generatedFiles = [];
  async.eachSeries(docsToGen, function(doc, callback) {
    var templatePath = path.join(__dirname, 'templates', projectPath, doc);
    var templateExt = path.extname(templatePath);
    var generatedFilePath = path.join(__dirname, 'output', 
                                      (dataSet.t + '_' + doc) );
    if ( templateExt == '.docx' ) {
      // If it encounters a docx template
      var docBuf = docxProcessor( templatePath, dataSet );
      fs.writeFileSync( generatedFilePath, docBuf );
      generatedFiles.push( generatedFilePath );
    } else if ( templateExt == '.xlsx') {
      // If it encounters a xlsx template
      var docBuf = xlsxProcessor();
      console.log('***** DEBUGE messasge ' + typeof docBuf + ' *****');
      // TODO ... then write the docBuf into file system
    }

    callback();
    }, function (err) {
        if ( err ) { 
          console.log(err + ' + err') 
        } else {
        // get an list of objects
        // which are desired by res.zip method.
        var downLoadFile = prepareDownLoad(generatedFiles);
        res.zip(downLoadFile, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('files have been sent.');
          }
        })}
    }
  );
});

// launch application
app.listen(2048);
console.log('Listening on localhost 2048');

/* 
 * This function is used to generate 
 * the data structure object
 * required by express-zip plug-in( res.zip )
 *
 * 1. argv
 * files must be an array of files' FULL pathes
 *
 */
function prepareDownLoad ( files ) {
  var fileObjs = [];
  files.forEach(function(file) {
    var fileObj = {};
    fileObj['path'] = file;
    fileObj['name'] = path.basename(file);
    fileObjs.push(fileObj);
  });
  return fileObjs;
}
