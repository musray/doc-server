'use strict'

var tplModle = {
    'ied': [ 'check_record.xlsx' ],
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

module.exports = function ( documentCategory, subDocumentCategory, iedRev ) {
  // documentCategory might be
  // ied, cin, iics
  var revisions = ['a', 'b', 'c']
  var templateList = [];
  if (subDocumentCategory) {
    templateList = tplModle[ documentCategory ]
                  .concat( iedCheckList[ subDocumentCategory ] );

    // for ied document within first three revisions
    // use ied_cover.docx as its cover
    // otherwise, ied_cover_long.docx should be used
    if ( revisions.indexOf(iedRev) != -1 ) {
      templateList.push('ied_cover.docx');
    } else {
      templateList.push('ied_cover_long.docx');
    }
  } else {
    templateList = tplModle[ documentCategory ];
  }
  
  return templateList;
};
