'use strict'
const fs = require('fs'),
      express = require('express'),
      engines = require('consolidate'),
      morgan = require('morgan'),
      async = require('async'),
      formatedDT = require('./libs/format-dt.js'),
      path = require('path'),
      zip = require('express-zip'),
      getTemplateList = require('./libs/gen-doc-list.js'),
      xlsxProcessor = require('./libs/xlsx-processor'),
      docxProcessor = require('./libs/docx-processor');

// set up express application
const app = express();
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(morgan('combined'));
// config express.static to make it accessable
// in the html's scirpt/src attribute, in this way:
// <script src="/frontend/js/name.js"></script>
app.use('/frontend', express.static( __dirname + '/frontend' ));
app.use('/bower_components', express.static( __dirname + '/bower_components' ));

// A 'catch-all' error handler copied from
// express API document.
// TODO Does this work as expected? 
// I've no idea.
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("<h1>Oops! 出错了！</h1>");
}
app.use(errorHandler);

var issuer= {
  'hyh-3': 'SDB',
  'hyh-4': 'SDB',
  'nd-3': 'SDB',
  'nd-4': 'SDB',
  'yj-1': 'YSDM',
  'yj-2': 'YSDM',
  'yj-3': 'YSDB',
  'yj-4': 'YSDB',
  'fcg-1':'SDM',
  'fcg-2':'SDM'
};
var projectAlias = {
  'hyh':'AA',
  'nd':'AB',
  'yj':'PY',
  'fcg':'BL'
};
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
  dataSet['project'] = req.query.project;
  // get AA if project is 'hyh-1'
  dataSet['p_a'] = req.query.project ? 
                   projectAlias[req.query.project.slice(0, -2)] : '';
  dataSet['unit'] = req.query.project ? 
                    req.query.project.slice(-1) : '';
  dataSet['site_stage'] = req.query.site_stage;
  dataSet['n_o_t'] = req.query.number_of_times;
  dataSet['issuer'] = issuer[req.query.project];
  dataSet['cabinet'] = req.query.cabinet;
  dataSet['r'] = req.query.rev;
  dataSet['d_b'] = req.query.draft;
  dataSet['c_b'] = req.query.check;
  dataSet['r_b'] = req.query.review;
  dataSet['a_b'] = req.query.approve; 
  if ( req.query.document_category == 'cin') {
    dataSet['t'] = req.query.project + ' ' + 
                   req.query.number_of_times + ' ' +
                   req.query.site_stage + ' ' + 
                   'site modification of' + ' ' + 
                   req.query.cabinet;
  } else {
   dataSet['t'] = req.query.title;
  }
  dataSet['i_s'] = req.query.index_short;
  dataSet['i_19'] = req.query.index_19;
  dataSet['pages'] = req.query.pages;
  dataSet['date'] = today.formatedDate('-');
  // splite index_19 into a list of each digit.
  var index_19 = req.query.index_19;
  if ( req.query.index_19 ) {
    for ( let m = 0; m < req.query.index_19.length; m++ ) {
      let no = 'i' + m;
      dataSet[no] = index_19[m]
  }
  }
  // Applicable to CPR1000
  // TODO for other projetcs
  dataSet['observation'] = 
    req.query.rev == 'A' ? 'First issue' 
                         : 'Revised according to design progress';

  // documentCategory is direvied from webpage
  // it might equals to 'ied', 'cin', 'iics', etc.
  var documentCategory = req.query.document_category;
  // documentCategory is direvied from webpage
  // it might equals to 'bdsd', 'io_list', 'software', 'wiring', etc.
  var subDocumentCategory = req.query.sub_document;
  var projectPath = '/' + req.query.main_project;

  // TODO This docsToGen will be produced by function
  // genDocList( documentCategory )
  // A list of templates might be created
  // in a form of [ 'sw_check_list.xlsx', 'ied_cover.docx', 'check_record.xlsx' ]
  // var docsToGen = genDocList( documentCategory );
  var docsToGen = getTemplateList( documentCategory, subDocumentCategory );
  
  // This only used in DEBUG stage.
  // var docsToGen = [ 'ied_cover.docx',
  //                   'sw_check_list.docx',
  //                   'cin_cover.xlsx' ]
  
  /* 
   * Use "generatedFiles" to collect the FULL path 
   * of final docs created below.
   * Then used in "express-zip"(res.zip method) module
   * to gathering docs to download.
   */
  var generatedFiles = [];
  async.eachSeries(docsToGen, function(doc, callback) {
    // preperation
    var templatePath = path.join(__dirname, 'templates', projectPath, doc);
    var templateExt = path.extname(templatePath);
    var generatedFilePath = path.join( __dirname, 'output', 
                                      (dataSet.t + '_' + doc) );
    // <MAIN block>
    if ( templateExt == '.docx' ) {
      // If it encounters a docx template
      var docBuf = docxProcessor( templatePath, dataSet );
      fs.writeFileSync( generatedFilePath, docBuf );
    } else if ( templateExt == '.xlsx') {
      // ***** DEBUG *****
      console.log(typeof templatePath, templatePath);
      // If it encounters a xlsx template
      var docBuf = xlsxProcessor( templatePath, dataSet );
      fs.writeFileSync(generatedFilePath, docBuf, 'binary');
    }
    generatedFiles.push( generatedFilePath );
    callback();
    // <MAIN block/>

    }, function (err) {
        if ( err ) { 
          console.log(err + ' + err') 
        } else {
        // An list of objects
        // which are in the structure 
        // required by express-zip module.
        var downLoadFile = wrapTheDownLoads( generatedFiles );
        res.zip(downLoadFile, function( err ) {
          if ( err ) {
            console.log( err );
          } else {
            console.log('files have been sent.');
          }
        })}
    }  // there is no semi-colon, since the function is an argument
  );
});

// launch application
app.listen(9786);
console.log('Listening on localhost 9786');

/* 
 * This function is used to generate 
 * the data structure object
 * required by express-zip plug-in( res.zip )
 *
 * 1. argv
 * files must be an array of files' FULL pathes
 *
 */
function wrapTheDownLoads ( files ) {
  var fileObjs = [];
  files.forEach(function(file) {
    var fileObj = {};
    fileObj['path'] = file;
    fileObj['name'] = path.basename(file);
    fileObjs.push(fileObj);
  });
  return fileObjs;
}
