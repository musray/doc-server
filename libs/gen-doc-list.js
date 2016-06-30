'use strict'

var tplModle = {
  'cpr1000': {
    'ied': [ 'ied_cover.docx', 'check_record.xlsx' ],
    'cin': [ 'cin_cover.xlsx', 'cin_check_list.xlsx', 'check_record.xlsx' ],
    'swcd': [ 'submit_sheet.docx', 'swcd_check_list', 'check_record.xlsx' ]
  },
  'yj56': {
    'ied': [ 'ied_cover.docx', 'check_record.xlsx' ],
    'swcd': [ 'submit_sheet.docx', 'swcd_check_list', 'check_record.xlsx' ]
  }
};

function getDocType ( docType ) {
  // Get particular check_list
  // according to docType

}
module.exports = function ( documentCategory ) {
  // documentCategory might be
  // ied, cin, iics
  if (documentCategory == 'ied') {
    var templateList = [ 'ied_cover.docx', 'check_record.xlsx' ];
    // TODO
    // push check_list template specificlly.
    // MONGODB will be queried based on index_19.
  } 
  else if (documentCategory == 'cin') {
    var templateList = ['cin_cover.xlsx', 'check_record.xlsx', 'cin_check_list.docx'];
  } 
  else if (documentCategory == 'iics') {
    var templateList = ['iics_cover.docx'];
  }
  return templateList;
};
