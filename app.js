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
      docxProcessor = require('./libs/docx-processor'),
      wagner = require('wagner-core'),
      getDataSet = require('./libs/get-data-set.js');

// 1. Set up the Express application ========================
const app = express();
// 1.1 Setup the randering engine
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// 1.2 Logging history
app.use(morgan('combined'));

// 2. Load framework or libs' scripts and css sheets ========
// configuration of express.static
// can make static files accessable
// by the HTML's <scirpt src=""> element.
app.use('/bower_components', express.static( __dirname + '/bower_components'));
app.use('/frontend', express.static( __dirname + '/frontend'));

// 3. Server side error handler ==============================
// A 'catch-all' error handler copied from
// express API document.
// TODO Does this work as expected?
// I've no idea.
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("<h1>Oops! 出错了！</h1>");
}
app.use(errorHandler);

// 4. Use the REST API =======================================
// NOT decided yet.
// require('./api/models')(wagner);
// app.use('/api/v1', require('./api/api')(wagner));

// 5. Response the Get request from root '/' =================
app.get('/', function(req, res) {
  res.render('index');
});

// 6. Response the Get request from /GET request =============
// !!!!! MAIN BUSSNESS LOGIC !!!!!
app.get('/GET', function(req, res) {

  // create formated date and time string
  // can be used at any place where
  // need current date or time
  // Date.prototype.formatedDate = formatedDT.formatedDate;
  // var today = new Date();

  // !!!!! THE MOST IMPORTANT VARIABLE !!!!!!
  var dataSet = getDataSet( req.query );

  // documentCategory is direvied from webpage
  // it might represent 'ied', 'cin', 'iics', etc.
  var documentCategory = req.query.document_category;

  // documentCategory is direvied from webpage
  // it might equals to 'bdsd', 'io_list', 'software', 'wiring', etc.
  // If documentCategory is not IED, subDocumentCategory will be null.
  var subDocumentCategory = req.query.sub_document;
  var projectPath = '/' + req.query.project;


  /*
   * docsToGen is a list of names of templates
   * which are located in /templates folder
   * , and wating to be filled automaticlly.
   * This list is created accroding to
   * document category. Sub document type, if it is a IED document.
   */
   console.log('DEBUG INFO', req.query.project)
   var docsToGen = getTemplateList( documentCategory,
                                    subDocumentCategory,
                                    req.query.project );
   // ******* Debug *******
   // var docsToGen = ['cin_cover.xlsx'];

  /*
   * Use "generatedFiles" array to collect the FULL path
   * of final docs created below.
   * Then used in "express-zip"(res.zip method) module
   * to gathering docs to download.
   */
  var generatedFiles = [];
  async.eachSeries(docsToGen, function(doc, callback) {
    // VARIABLE 'doc' is kind of abs path of a template file, such as
    // ./templates/yj56/ied_cover.docx
    var templateExt = path.extname(doc);
    var generatedFilePath = path.join( __dirname, 'output',
                                      (dataSet.t + '_' + path.basename(doc)) );
    // <MAIN logic code block>
    if ( templateExt == '.docx' ) {
      // Case1 - When it encounters a docx template
      var docBuf = docxProcessor( doc, dataSet );
      fs.writeFileSync( generatedFilePath, docBuf );
    } else if ( templateExt == '.xlsx') {
      // Case2 - When it encounters a xlsx template
      // ***** DEBUG *****
      // console.log(typeof templatePath, templatePath);
      var docBuf = xlsxProcessor( doc, dataSet );
      fs.writeFileSync(generatedFilePath, docBuf, 'binary');
    }
    generatedFiles.push( generatedFilePath );
    callback();
    // <MAIN logic code block/>

    }, function (err) {
        if ( err ) {
          console.log(err + ' + err')
          res.send('Oops! Some bad things happend!');
        } else {
        // downLoadFile is an Array of objects
        // which are organized in the particular structure
        // required by express-zip module.
        // wrapTheDownloads function is defined at bottom
        // of this script file.
        var downLoadFile = wrapTheDownLoads( generatedFiles );
        res.zip(downLoadFile, function( err ) {
          if ( err ) {
            console.log( err );
          } else {
            console.log('files have been sent.');
          }
        })}
    }  // Note there is no semi-colon, since the function is an argument
  );
});

// launch application
var port = process.argv[2]
console.log('port is ' + port);
port = port ? port : 9786;
app.listen(port);
console.log('Listening on localhost ' + port);

/*
 * This helper function is used to generate
 * the data structure object
 * required by express-zip plug-in( res.zip )
 *
 * 1. about argv
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
