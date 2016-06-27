'use strict'
var Docxtemplater = require('docxtemplater');

module.exports = function ( content ) {
  var output = new Docxtemplater(content);

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
