'use strict'
/*
 *
 * Pass res.query object into this module.
 * The parse the url query parameters and
 * save them in a full set of dataSet object.
 * dataSet will be use to fill to docx or xlsx templates
 *
 */

// The helper function which handle the formats
// of date and time object.
const formatedDT = require('./format-dt.js');

Date.prototype.formatedDate = formatedDT.formatedDate;
var today = new Date();

// CIN only
// data mappings
var issuerCodes= [
  // 'hyh-34, nd-34': 'SDB', 'yj-12': 'YSDM', 'yj-34': 'YSDB', 'fcg-12':'SDM',
  // cpr1000 projects are reserved
  {
    projects: ['yj-5', 'yj-6'],
    code: 'YSDG'
  },
  {
    projects: ['tw-5', 'tw-6'],
    code: 'xxx'
  },
  {
    projects: ['fcg-3', 'fcg-4', 'hyh-5', 'hyh-6'],
    code: 'GSNS'
  }
];

// CIN only
// project_code
var projectCodes = [
  // 'hyh':'AA',
  // 'nd':'AB',
  // 'yj':'PY',
  // 'fcg':'BL'
  {
    projects: ['hyh-1', 'hyh-2', 'hyh-3', 'hyh-4'],
    code    : 'AA'
  },
  {
    projects: ['hyh-5', 'hyh-6'],
    code    : 'AZ'
  },
  {
    projects: ['nd-1', 'nd-2', 'nd-3', 'nd-4'],
    code    : 'AB'
  },
  {
    projects: ['yj-1', 'yj-2','yj-3', 'yj-4', 'yj-5', 'yj-6'],
    code    : 'PY'
  },
  {
    projects: ['fcg-3', 'fcg-4'],
    code    : 'BS'
  }
];
// used in CIN
var eomrIndex = {
  'yj-1' : 'PY157110620W00A04GN',
  'yj-2' : 'PY257110620W00A04GN',
  'yj-3' : 'PY357110033W00A04GN',
  'yj-4' : 'PY457110034W00A04GN',
  'hyh-3': 'AA357110201W00B04GN',
  'hyh-4': 'AA457110201W00B04GN',
  'nd-3' : 'AB357110602W00B44GN',
  'nd-4' : 'AB457110602W00B44GN',
  'fcg-1': 'BL157110033W00B04GN',
  'fcg-2': 'BL257110034W00B04GN',
  'yj-5' : 'PY557110002W00A04GN',
  'yj-6' : 'PY657110002W00A04GN',
  'hyh-5': 'AZ557110013W00A04GN',
  'hyh-6': 'AZ657110013W00A04GN',
  'fcg-3': 'BS357110004W00A04GN',
  'fcg-4': 'BS457110004W00A04GN',
  'tw-5' : '',
  'tw-6' : '',
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
    'init': '初版发布',
    'update': '升版'
  },
  'hyh56': {
    'init': '初版发布',
    'update': '升版'
  },
  'yj56': {
    'init': '初版发布',
    'update': '升版'
  },
  'fcg34': {
    'init': '初版发布',
    'update': '升版'
  }
};

function autoExtRevRow ( list, number, obj ) {
  // if list.length < number,
  // extend the list with obj
  // otherwise, original list is returned.
  var tempList = list.slice(); // use slice method to avoid modifing list directly.
  for (var len = list.length; len < number; len++) {
    tempList.push(obj);
  }
  return tempList;
}

function generateRevRow ( reqQuery ) {
  /*
   * return an list of revision histories.
   */

  // Note: the Date() constructor has been modified
  var today = new Date();

  // the array of data represents revision tables in the first
  // , second and third page of IED cover.
  var revisionList = [];

  var revQueue = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // 0 has no meaning but taken the zero position.
  var nextRev = reqQuery.rev? reqQuery.rev.toUpperCase() : ''; // nextRev stands for desired doc version.

  // push each revElem, which represents to a revision, into revisionList
  for (var i = 1; i <= revQueue.indexOf(nextRev); i++) {
    // **** DEBUG ****
    // console.log(i);
    var revElem = {};
    revElem.st = 'CFC';
    revElem.no = i;
    revElem.r = revQueue[i];

    if (i == revQueue.indexOf(nextRev)) { // at the last round of iteration.
      revElem.d_b   = reqQuery.draft;     // designed by
      revElem.d_b_e = reqQuery.draft_e; // Signature in English will only involvoed in CPR1000 project
      revElem.c_b   = reqQuery.check;     // checked by
      revElem.c_b_e = reqQuery.check_e;
      revElem.r_b   = reqQuery.review;    // reviewed by
      revElem.r_b_e = reqQuery.review_e;
      revElem.a_b   = reqQuery.approve;   // approved by
      revElem.a_b_e = reqQuery.approve_e;
      revElem.date  = today.formatedDate('-'); // here needs history information; maybe introduce Mongodb in the future.
    } else {  // from first to the last but one round of iteration.
      revElem.d_b   = '';  // here needs history information; maybe introduce Mongodb in the future.
      revElem.d_b_e = '';
      revElem.c_b   = '';
      revElem.c_b_e = '';
      revElem.r_b   = '';
      revElem.r_b_e = '';
      revElem.a_b   = '';
      revElem.a_b_e = '';
      revElem.date  = '';
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

  // unit: yj-5, tw-6, etc
  dataSet['unit'] = reqQuery.unit
                    ? reqQuery.unit.toUpperCase()
                    : '';
  // unit_num: 5 of yj-5, 6 of tw-6, etc
  dataSet['unit_num'] = reqQuery.unit
                        ? reqQuery.unit.slice(-1)
                        : '';
  // TODO To be deleted.
  // // get AA if unit is 'hyh-1'
  // dataSet['site'] = reqQuery.unit ?
  //                   reqQuery.unit.slice(0, -2).toUpperCase() : '';

  // CIN Only
  // project_code will be: PY, AZ, BS, etc
  dataSet['project_code'] =
    reqQuery.unit
    ? projectCodes.filter(x => x.projects.some(x => x === reqQuery.unit))[0]['code']
    : '';
  // console.log('project_code: ', dataSet['project_code']);

  // CIN Only
  // issuer_code will be: YSDG, GSNS, etc.
  dataSet['issuer_code'] =
    reqQuery.unit
    ? issuerCodes.filter(x => x.projects.some(x => x === reqQuery.unit))[0]['code']
    : '';

  // CIN Only
  dataSet['unit_number'] = reqQuery.unit ?
                    reqQuery.unit.slice(-1) : '';
  // CIN Only
  // site_stage_zh: 复原，第3次现场改造， 第1次大修
  // origin: cinHTML.html
  // .site_stage = '1st_sm,第1次现场改造'
  dataSet['site_stage'] = reqQuery.site_stage ? reqQuery.site_stage.split(',')[1] : '';

  // CIN Only
  dataSet['qualification'] = reqQuery.qualification
                             ? reqQuery.qualification.toUpperCase()
                             : '';

  // dataSet['n_o_t'] = reqQuery.number_of_times;
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
    dataSet['t'] = 'CIN ' +
                   reqQuery.unit.toUpperCase() + ' ' +
                   reqQuery.site_stage.split(',')[1] +
                   ' ' + '(' +
                   reqQuery.cabinet + ')';
    // console.log('CIN title', dataSet['t']);
  } else {
    // title of documents other than CI N
   dataSet['t'] = reqQuery.title;
  }
  dataSet['i_s'] = reqQuery.index_short;
  dataSet['i_19'] = reqQuery.index_19;

  // The case pages === 1 only will occure when CIN has no attachment
  // The pages of IED document is always greater than 1.
  dataSet['pages'] = reqQuery.pages === '1'
                     ? '2'
                     : reqQuery.pages;
  // dataSet['date'] = today.formatedDate('-');

  // splite index_19 into a list of each digit.
  var index_19 = reqQuery.index_19;
  if ( reqQuery.index_19 ) {
    for ( let m = 0; m < reqQuery.index_19.length; m++ ) {
      let no = 'i' + m;
      dataSet[no] = index_19[m]
    }
  }

  // splite index_19_ref into an array of every digit.
  // Added on 2016-12-07
  var index_19_ref = reqQuery.index_19_ref;
  if (reqQuery.index_19_ref) {
    if ( reqQuery.index_19_ref.length === 19 ) {  // reference document
      for ( let m = 0; m < reqQuery.index_19_ref.length; m++ ) {
        let no_ref = 'ir' + m;  // 'no_ref': number of reference doc, 'ir': index of ref
        dataSet[no_ref] = index_19_ref[m]
      }
      dataSet['ir_r'] = reqQuery.rev_ref;
      dataSet['title_ref'] = reqQuery.title_ref;
      dataSet['new'] = '';
      dataSet['modified'] = 'X';
    } else {                                    // reference document
      for ( let m = 0; m < 19; m++ ) {
        let no_ref = 'ir' + m;  // 'no_ref': number of reference doc, 'ir': index of ref
        dataSet[no_ref] = '';
      }
      dataSet['ir_r'] = '';
      dataSet['new'] = 'X';
      dataSet['modified'] = '';
    }
  }

  // observation is applicable to CPR1000
  // TODO for other projetcs
  dataSet['observation'] = reqQuery.rev === 'A' ? '初版发布' : '升版';

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
                  'a_b':'', 'a_b_e':'',
                  'observation':'' };

  var revRow = generateRevRow( reqQuery );

  // for first page of cover
  dataSet['r_r_1'] = autoExtRevRow(revRow, 3, revElem).slice(-3).reverse(); // first page of cover
  // dataSet['r_r_2'] = autoExtRevRow(revRow.slice(0, -3), 12, revElem).slice(-16);
  dataSet['r_r_3'] = autoExtRevRow(revRow, 3, revElem).slice(-3);  // second page of cover
  dataSet['r_r_4'] = autoExtRevRow(revRow, 11, revElem).slice(-11); // third page of cover
  // Ask myself: what is this 'r_leading' used for?
  dataSet['r_leading'] = revRow.slice(0, -3).pop() ?
                         revRow.slice(0, -3).pop()['r'].toUpperCase() : '';

  return dataSet;
};
