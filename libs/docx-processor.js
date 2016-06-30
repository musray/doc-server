'use strict'
var Docxtemplater = require('docxtemplater');
var path = require('path');
var fs = require('fs');

module.exports = function ( template, dataSet ) {
  var tplContent = fs.readFileSync( template, 'binary' );
  var output = new Docxtemplater(tplContent);
  output.setData(dataSet);
  output.render();
  var buf = output.getZip()
                  .generate({ type: 'nodebuffer' });
  var outputFile = __dirname + '/'
                   + dataSet.t + path.extname(content);
  fs.writeFileSync(outputFile, buf);
  console.log(path.basename(outputFile) + ' is generated!');
  return outputFile;
};
    // if ( extensionName == '.docx' ) {
    //   var output = new Docxtemplater(content);
    //   output.setData(dataSet);
    //   output.render();
    //   var buf = output.getZip()
    //                  .generate({ type: 'nodebuffer' });
    //
    //   var outputFile = __dirname + '/output/' 
    //                  + doc + '_' + dataSet.t 
    //                  + path.extname(fileType[doc]);
    //
    //   fs.writeFileSync(outputFile, buf);
    //   console.log(path.basename(outputFile) + 'is generated!');
    //   generatedFiles.push(outputFile);
    // }
