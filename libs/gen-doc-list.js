'use strict'

// var tplModle = {
//   'cpr1000': {
//     'ied': [ 'ied_cover.docx', 'check_record.xlsx' ],
//     'cin': [ 'cin_cover.xlsx', 'cin_check_list.xlsx', 'check_record.xlsx' ],
//     'swcd': [ 'submit_sheet.docx', 'swcd_check_list', 'check_record.xlsx' ]
//   },
//   'yj56': {
//     'ied': [ 'ied_cover.docx', 'check_record.xlsx' ],
//     'swcd': [ 'submit_sheet.docx', 'swcd_check_list', 'check_record.xlsx' ]
//   }
// };
var tplModle = {
    'ied': [ 'ied_cover.docx', 'check_record.xlsx' ],
    'cin': [ 'cin_cover.xlsx', 'cin_check_list.xlsx', 'check_record.xlsx' ],
    'swcd': [ 'submit_sheet.docx', 'swcd_check_list', 'check_record.xlsx' ]
};

// ***** TODO *****
// make sure the extname is correct.
var iedCheckList = {
  'bdsd': 'bdsd_check_list.xlsx',
  'wiring': 'wd_check_list.xlsx',
  'software': 'sw_check_list.docx',
  'io_list': 'sw_check_list.xlsx',
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
