'use strict'
/*
 * 
 * Pass res.query object into this module.
 * The parse the url query parameters and
 * save them in a full set of dataSet object.
 * dataSet will be use to fill out  in docx or xlsx templates
 *
 */

const formatedDT = require('./format-dt.js');

Date.prototype.formatedDate = formatedDT.formatedDate;
var today = new Date();

var supplyerCode= {
  'hyh-3': 'SDB',
  'hyh-4': 'SDB',
  'nd-3': 'SDB',
  'nd-4': 'SDB',
  'yj-1': 'YSDM',
  'yj-2': 'YSDM',
  'yj-3': 'YSDB',
  'yj-4': 'YSDB',
  'fcg-1':'SDM',
  'fcg-2':'SDM'
};
var projectAlias = {
  'hyh':'AA',
  'nd':'AB',
  'yj':'PY',
  'fcg':'BL'
};
var eomrIndex = {
  'yj-1':'PY157110620W00A04GN',
  'yj-2':'PY257110620W00A04GN',
  'yj-3':'PY357110033W00A04GN',
  'yj-4':'PY457110034W00A04GN',
  'hyh-3':'AA357110201W00B04GN',
  'hyh-4':'AA457110201W00B04GN',
  'nd-3':'AB357110602W00B44GN',
  'nd-4':'AB457110602W00B44GN',
  'fcg-1':'BL157110033W00B04GN',
  'fcg-2':'BL257110034W00B04GN'
};
var projectVerbose = {
  'yj-1':'CPR1000 EXTENSION PROJECT DCS (D)',
  'yj-2':'CPR1000 EXTENSION PROJECT DCS (D)',
  'yj-3':'CPR1000 EXTENSION PROJECT DCS(YJ34)',
  'yj-4':'CPR1000 EXTENSION PROJECT DCS(YJ34)',
  'hyh-3':'CPR1000 EXTENSION PROJECT DCS (C)',
  'hyh-4':'CPR1000 EXTENSION PROJECT DCS (C)',
  'nd-3':'CPR1000 EXTENSION PROJECT DCS (E)',
  'nd-4':'CPR1000 EXTENSION PROJECT DCS (E)',
  'fcg-1':'CPR1000 EXTENSION PROJECT DCS (FCG)',
  'fcg-2':'CPR1000 EXTENSION PROJECT DCS (FCG)'
};
var contractNumber = {
  'yj-1':'NPD0909004',
  'yj-2':'NPD0909004',
  'yj-3':'NPD1104001',
  'yj-4':'NPD1104001',
  'hyh-3':'NPD0707002(C)',
  'hyh-4':'NPD0707002(C)',
  'nd-3':'NPD0911004',
  'nd-4':'NPD0911004',
  'fcg-1':'NPD1012003',
  'fcg-2':'NPD1012003'
};
var observations = {
  'cpr1000': {
    'init': 'First Issue',
    'update': 'Update accroding to design progress'
  },
  'tw56': {
    'init': 'First Issue',
    'update': 'Update accroding to design progress'
  },
  'hyh56': {
    'init': 'First Issue',
    'update': 'Update accroding to design progress'
  },
  'yj56': {
    'init': 'First Issue',
    'update': 'Update accroding to design progress'
  },
  'fcg34': {
    'init': 'First Issue',
    'update': 'Update accroding to design progress'
  }
};

function autoExtRevRow ( list, number, obj ) {
  // if list.length < number,
  // extend the list with obj
  var tempList = list.slice(); // use slice to avoid modifing list directly.
  for (var len = list.length; len < number; len++) {
    tempList.push(obj);
  }
  return tempList;
}

function generateRevRow ( reqQuery ) {
  /*
   * return an list of revision histories.
   */
  var revisionList = [];
  var revQueue = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var nextRev = reqQuery.rev? reqQuery.rev.toUpperCase() : '';
  for (var i = 1; i <= revQueue.indexOf(nextRev); i++) {
    console.log(i);
    var revElem = {};
    revElem.st = 'CFC';
    revElem.no = i;
    revElem.r = revQueue[i];
    revElem.date = ''; // here where mongodb query get intruduced

    if (i == revQueue.indexOf(nextRev)) {
      revElem.d_b = reqQuery.draft;
      revElem.d_b_e = reqQuery.draft_e;
      revElem.c_b = reqQuery.check;
      revElem.c_b_e = reqQuery.check_e;
      revElem.r_b = reqQuery.review;
      revElem.r_b_e = reqQuery.review;
      revElem.a_b = reqQuery.approve;
      revElem.a_b_e = reqQuery.approve;
    } else {
      revElem.d_b = '';  // here where mongodb query get introduced.
      revElem.d_b_e = '';
      revElem.c_b = '';
      revElem.c_b_e = '';
      revElem.r_b = '';
      revElem.r_b_e = '';
      revElem.a_b = '';
      revElem.a_b_e = '';
    } 

    if (i == 1) {
      revElem.observation = observations[reqQuery.project].init;
    } else {
      revElem.observation = observations[reqQuery.project].update;
    }

    revisionList.push(revElem);
  }

  return revisionList;
}

module.exports = function ( reqQuery ) {
  // DATASET will be used in docx-templating
  var dataSet = {};

  dataSet['unit'] = reqQuery.unit ?
                       reqQuery.unit.toUpperCase() : '';
  // get AA if unit is 'hyh-1'
  dataSet['site'] = reqQuery.unit ?
                    reqQuery.unit.slice(0, -2).toUpperCase() : '';
  dataSet['p_a'] = reqQuery.unit ? 
                   projectAlias[reqQuery.unit.slice(0, -2)] : '';
  dataSet['unit_number'] = reqQuery.unit ? 
                    reqQuery.unit.slice(-1) : '';
  dataSet['site_stage'] = reqQuery.site_stage;
  dataSet['n_o_t'] = reqQuery.number_of_times;
  dataSet['supplyerCode'] = supplyerCode[reqQuery.unit];
  dataSet['cabinet'] = reqQuery.cabinet;
  dataSet['r'] = reqQuery.rev ? 
                 reqQuery.rev.toUpperCase() : '';
  dataSet['d_b'] = reqQuery.draft;
  dataSet['c_b'] = reqQuery.check;
  dataSet['r_b'] = reqQuery.review;
  dataSet['a_b'] = reqQuery.approve; 
  dataSet['d_b_e'] = reqQuery.draft_e;
  dataSet['c_b_e'] = reqQuery.check_e;
  dataSet['r_b_e'] = reqQuery.review_e;
  dataSet['a_b_e'] = reqQuery.approve_e; 
  if ( reqQuery.document_category == 'cin') {
    // title of CIN
    dataSet['t'] = reqQuery.unit.toUpperCase() + ' ' + 
                   reqQuery.number_of_times + ' ' +
                   reqQuery.site_stage + ' ' + 
                   'site modification of' + ' ' + 
                   reqQuery.cabinet;
  } else {
    // title of documents other than CIN
   dataSet['t'] = reqQuery.title;
  }
  dataSet['i_s'] = reqQuery.index_short;
  dataSet['i_19'] = reqQuery.index_19;
  dataSet['pages'] = reqQuery.pages;
  dataSet['date'] = today.formatedDate('-');

  // splite index_19 into a list of each digit.
  var index_19 = reqQuery.index_19;
  if ( reqQuery.index_19 ) {
    for ( let m = 0; m < reqQuery.index_19.length; m++ ) {
      let no = 'i' + m;
      dataSet[no] = index_19[m]
    }
  }

  // observation is applicable to CPR1000
  // TODO for other projetcs
  dataSet['observation'] = 
    reqQuery.rev == 'A' ? 'First issue' 
                         : 'Revised according to design progress';
  
  // get EOMR index number
  dataSet['eomr'] = eomrIndex[reqQuery.unit];

  // below section is added for swcd
  dataSet['backup'] = reqQuery.backup_name? 
                      reqQuery.backup_name.toUpperCase() : '';
  dataSet['backup_path'] = reqQuery.backup_path? 
                      reqQuery.backup_path.toUpperCase() : '';

  if ( reqQuery.sw_rev)  { 
    dataSet['r'] = 'V000.' + reqQuery.sw_rev;
  }

  dataSet['p_r'] = 'V' + reqQuery.pol_rev;
  dataSet['g_r'] = 'V' + reqQuery.gca_rev;
  dataSet['den'] = reqQuery.den_list;
  dataSet['new_old_pages'] = reqQuery.new_old_pages;

  // some verbose things
  dataSet['project_verbose'] = projectVerbose[reqQuery.unit];
  dataSet['contract_number'] = contractNumber[reqQuery.unit];

  // for multi-revision document covers
  // revRow will be a list of revision histories
  // which has a minimum lenght of 7 
  // (determined by ied document cover structure)
  var revElem = { 'st': '', 'no':'', 'r':'', 'date':'', 
                  'd_b':'', 'd_b_e':'', 
                  'c_b':'', 'c_b_e':'', 
                  'r_b':'', 'r_b_e':'', 
                  'a_b':'', 'a_b_e':'', 'observation':'' }

  var revRow = generateRevRow( reqQuery );
  dataSet['r_r_1'] = autoExtRevRow(revRow, 3, revElem).slice(-3).reverse();  // for first page of cover
  dataSet['r_r_2'] = autoExtRevRow(revRow.slice(0, -3), 12, revElem).slice(-12);
  dataSet['r_r_3'] = autoExtRevRow(revRow, 7, revElem).slice(-7);
  dataSet['r_r_4'] = autoExtRevRow(revRow, 17, revElem).slice(-18);
  dataSet['r_leading'] = revRow.slice(0, -3) ?
                         revRow.slice(0, -3).pop()['r'].toUpperCase() : '';

  return dataSet;
};

