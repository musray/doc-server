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

module.exports = function ( reqQuery ) {
  // DATASET will be used in docx-templating
  var dataSet = {};

  dataSet['project'] = reqQuery.project ?
                       reqQuery.project.toUpperCase() : '';
  // get AA if project is 'hyh-1'
  dataSet['site'] = reqQuery.project ?
                    reqQuery.project.slice(0, -2).toUpperCase() : '';
  dataSet['p_a'] = reqQuery.project ? 
                   projectAlias[reqQuery.project.slice(0, -2)] : '';
  dataSet['unit'] = reqQuery.project ? 
                    reqQuery.project.slice(-1) : '';
  dataSet['site_stage'] = reqQuery.site_stage;
  dataSet['n_o_t'] = reqQuery.number_of_times;
  dataSet['supplyerCode'] = supplyerCode[reqQuery.project];
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
    dataSet['t'] = reqQuery.project.toUpperCase() + ' ' + 
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
  dataSet['eomr'] = eomrIndex[reqQuery.project];

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

  return dataSet;
};

