'use strict'
const path = require('path');

// ***** TODO *****
// Need to make sure the extname is correct.


// module.exports = function ( documentCategory, subDocumentCategory, project /*, iedRev*/ ) {
module.exports = function ( docType, subDocType, project /*, iedRev*/ ) {
  // CORE FUNCTION:
  // Return a array containing the desired templates.
  var iedGenerator = function ( subDocType, project) {

    var iedCoverAndCheck = {
      'cin'         : [ 'cin_cover.xlsx'            , 'cin_check_list.xlsx' ],         // CIN
      'arrangement' : [ 'ied_cover_arrangement.docx', 'arrangement_check_list.xlsx' ], // 机柜安装图
      'assemble'    : [ 'ied_cover_assemble.docx'   , 'assemble_check_list.xlsx' ],    // 装配接线表
      'config'      : [ 'ied_cover_config.docx'     , 'config_check_list.xlsx' ],      // 算法组态
      'fd'          : [ 'ied_cover_fd.docx'         , 'fd_check_list.xlsx' ],          // 功能图
      'io_list'     : [ 'ied_cover_io.docx'         , 'io_check_list.xlsx' ],          // IO List
      'layout'      : [ 'ied_cover_layout.docx'     , 'layout_check_list.xlsx' ],      // 机柜布置图
      'setpoint'    : [ 'ied_cover_setpoint.docx'   , 'setpoint_check_list.xlsx' ],    // 设定值清单
      'terminal'    : [ 'ied_cover_terminal.docx'   , 'terminal_check_list.xlsx' ],    // 端子接线表
      'wd'          : [ 'ied_cover_wd.docx'         , 'wd_check_list.xlsx' ],          // 接线图
      'spec'        : [ 'ied_cover_spec.docx'       , 'generic_check_list.xlsx' ]      // 说明书
    };
    // var iedCheckLists = {
    //   'cin'         : 'cin_check_list.xlsx',         // CIN
    //   'arrangement' : 'arrangement_check_list.xlsx', // 机柜安装图
    //   'assemble'    : 'assemble_check_list.xlsx',    // 装配接线表
    //   'config'      : 'config_check_list.xlsx',      // 算法组态
    //   'fd'          : 'fd_check_list.xlsx',          // 功能图
    //   'io_list'     : 'io_check_list.xlsx',          // IO List
    //   'layout'      : 'layout_check_list.xlsx',      // 机柜布置图
    //   'setpoint'    : 'setpoint_check_list.xlsx',    // 设定值清单
    //   'terminal'    : 'terminal_check_list.xlsx',    // 端子接线表
    //   'wd'          : 'wd_check_list.xlsx'           // 接线图
    // };
    var iedList = [];

    // Add IED cover
    iedList.push(path.join(
      __dirname, 'templates', project, iedCoverAndCheck[subDocType][0]));

    // Add specified ied check list
    var checkList = iedCoverAndCheck[subDocType][1];
    iedList.push(path.join(
      __dirname, 'templates', 'check_list', checkList));

    // Add check record
    iedList.push(path.join(
      __dirname, 'templates', 'check_record.xlsx'));

    return iedList;
  };

  var cinGenerator = function ( project ) {
    var cinList = [];
    // Add CIN cover
    cinList.push(path.join(
      __dirname, 'templates', project, 'cin_cover.xlsx'));

    // Add CIN check list 检查内容表
    cinList.push(path.join(
      __dirname, 'templates', 'check_list', 'cin_check_list.xlsx'));

    // Add check record 问题解决单
    iedList.push(path.join(
      __dirname, 'templates', 'check_record.xlsx'));

    return cinList();
  };

  var swcdGenerator = function ( project ) {
    var swcdList = [];

    // Add swcd cover
    cinList.push(path.join(
      __dirname, 'templates', project, 'swcd_cover.xlsx'));

    // Add CIN check list 检查内容表
    cinList.push(path.join(
      __dirname, 'templates', 'check_list', 'swcd_check_list.xlsx'));

    // Add check record 问题解决单
    iedList.push(path.join(
      __dirname, 'templates', 'check_record.xlsx'));

    return swcdList;
  };

  var templatesList = [];
  if (docType === 'ied') {
    templatesList = iedGenerator( subDocType, project );
  } else if (docType === 'cin') {
    templatesList = cinGenerator( project );
  } else if (docType === 'swcd') {
    templatesList = swcdGenerator( project );
  }

  return templatesList;

  // TODO Remove
  // var revisions = ['A', 'B', 'C', 'a', 'b', 'c']
  // var templateList = [];
  // if (subDocumentCategory) {
  //   templateList = tplModle[ documentCategory ]
  //                 .concat( iedCheckList[ subDocumentCategory ] );
  //
  //   // for IED documents whose version is less than or equal to C,
  //   // use ied_cover.docx as its cover.
  //   // Otherwise, ied_cover_long.docx should be used
  //   if ( revisions.indexOf(iedRev) != -1 ) {
  //     templateList.push('ied_cover.docx');
  //   } else {
  //     templateList.push('ied_cover_long.docx');
  //   }
  // } else {
  //   templateList = tplModle[ documentCategory ];
  // }

};
