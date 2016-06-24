'use strict'
const fs = require('fs'),
      express = require('express'),
      engines = require('consolidate'),
      morgan = require('morgan'),
      async = require('async'),
      ymd = require('./yyyymmdd'),
      path = require('path'),
      zip = require('express-zip'),
      XLSX = require('xlsx-template'),
      Docxtemplater = require('docxtemplater');

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
// main biz logic
app.get('/GET', function(req, res) {

  var docsToGen = ['ied_cover', 'check_list']
  var dataSet = {};
  dataSet['r'] = req.query.rev;
  dataSet['d_b'] = req.query.draft;
  dataSet['c_b'] = req.query.check;
  dataSet['r_b'] = req.query.review;
  dataSet['a_b'] = req.query.approve; 
  dataSet['t'] = req.query.title;
  dataSet['i_s'] = req.query.index_short;
  dataSet['pages'] = req.query.pages;
  
  Date.prototype.ymd = ymd;
  var today = new Date();
  dataSet['date'] = today.ymd('-');


  (function setIndex19 () {
    var index_19 = req.query.index_19;
    for ( var m = 0; m < req.query.index_19.length; m++ ) {
      var no = 'i' + m;
      dataSet[no] = index_19[m]
    }
  }())
  
  // might be cpr1000, tw56, yj56, fcg34 ...
  var docsToGen = [ 'sw_check_list', 'ied_cover' ];
  // var projectPath = '/' + req.query.project;
  var projectPath = '/cpr1000';
  var fileType = {
    ied_cover : '/' + 'ied_cover.docx',
    sw_check_list : '/' + 'sw_check_list.docx',
    check_record : '/' + 'check_record.xlsx'
  };


  var generatedFiles = [];
  async.eachSeries(docsToGen, function(doc, callback) {
    var filePath = __dirname 
                + '/templates' 
                + projectPath 
                + fileType[doc];

    var content = fs
      .readFileSync(filePath, 'binary');

    var output = new Docxtemplater(content);
    output.setData(dataSet);
    output.render();
    var buf = output.getZip()
                   .generate({ type: 'nodebuffer' });

    var outputFile = __dirname + '/output/' 
                   + doc + '_' + dataSet.t 
                   + path.extname(fileType[doc]);

    fs.writeFileSync(outputFile, buf);
    console.log(path.basename(outputFile) + 'is generated!');
    generatedFiles.push(outputFile);
    callback();
    }, function (err) {
        if ( err ) console.log(err + ' + err');
        var downLoadFile = prepareDownLoad(generatedFiles);
        res.zip(downLoadFile, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('files have been sent.');
          }
        });
    }
  );
});

// launch application
app.listen(2048);
console.log('Listening on localhost 2048');

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

// 模板有两类，docx格式或xlsx格式
// 需要些两个类型的处理模板，实现模板的填写和最终文件生成
function checkExtension ( file ) {
  var fileTypes = {
    '.xlsx' 
  };
  var extName = path.extname(file);
  return fileType = 
}
