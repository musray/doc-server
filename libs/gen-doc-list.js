'use strict'

var tplModle = {
    'ied': [ 'ied_cover.docx', 'check_record.xlsx' ],
    'cin': [ 'cin_cover.xlsx', 'cin_check_list.xlsx', 'check_record.xlsx' ],
    'swcd': [ 'swcd_cover.docx', 'check_record.xlsx', 'swcd_check_list.docx' ]
};

// ***** TODO *****
// Need to make sure the extname is correct.
var iedCheckList = {
  'bdsd': 'bdsd_check_list.xlsx',
  'wiring': 'wd_check_list.xlsx',
  'software': 'sw_check_list.docx',
  'io_list': 'io_check_list.xlsx',
};

module.exports = function ( documentCategory, subDocumentCategory ) {
  // documentCategory might be
  // ied, cin, iics
  var templateList = [];
  if (subDocumentCategory) {
    templateList = tplModle[ documentCategory ]
                  .concat( iedCheckList[ subDocumentCategory ] );
  } else {
    templateList = tplModle[ documentCategory ];
  }
  
  return templateList;
};
