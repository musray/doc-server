'use strict'
module.exports = function ( documentCategory, index_19 ) {
  // documentCategory might be
  // ied, cin, iics
  if (documentCategory == 'ied') {
    var templateList = ['ied_cover.docx', 'check_record.xlsx'];
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
