var iedOptions = '<option value="bdsd">FD(BDSD)功能图</option> <option value="io_list">IO List</option> <option value="software">Software软件图</option> <option value="wiring">WD(IF)接线图</option> '; 

var iedHTML = '<label for="project">项目编号</label> <select id="document_selection" name="project"> <option value="yj-1">YJ-1</option> <option value="yj-2">YJ-2</option> <option value="yj-3">YJ-3</option> <option value="yj-4">YJ-4</option> <option value="hyh-3">HYH-3</option> <option value="hyh-4">HYH-4</option> <option value="nd-3">ND-3</option> <option value="nd-4">ND-4</option> <option value="fcg-1">FCG-1</option> <option value="fcg-2">FCG-2</option> </select> <label for="index_19">19位编码</label> <input type="text" name="index_19"> <label for="index_inter">内部编码</label> <input type="text" name="index_short"> <label for="title">文件名称</label> <input type="text" name="title"> <label for="rev">版本</label> <input type="text" name="rev"> <label for="pages">总页数</label> <input type="text" name="pages"> <div id="signatures_e"> <label for="draft_e">Draft</label> <input type="text" name="draft_e"> <label for="check_e">Check</label> <input type="text" name="check_e" id="check_by_outer"> <label for="review_e">Review</label> <input type="text" name="review_e" id="review_by_outer"> <label for="approve_e">Approve</label> <input type="text" name="approve_e" id="approve_by_outer"> </div> <div id="signatures"> <label for="draft">设计人</label> <input type="text" name="draft"> <label for="check">互查人</label> <input type="text" name="check"> <label for="review">审核人</label> <input type="text" name="review" id="review_by"> <label for="approve">批准人</label> <input type="text" name="approve" id="approve_by"></div>';

var cinHTML = '<label for="project">项目编号</label> <select id="document_selection" name="project"> <option value="yj-1">YJ-1</option> <option value="yj-2">YJ-2</option> <option value="yj-3">YJ-3</option> <option value="yj-4">YJ-4</option> <option value="hyh-3">HYH-3</option> <option value="hyh-4">HYH-4</option> <option value="nd-3">ND-3</option> <option value="nd-4">ND-4</option> <option value="fcg-1">FCG-1</option> <option value="fcg-2">FCG-2</option> </select> <div id="project_info"> <label for="site_stage">改造阶段</label> <select id="document_selection" name="site_stage"> <option value="">现场改造</option> <option value="periodical">大修</option> </select> <label for="number_of_times">改造次数</label> <input type="text" name="number_of_times">(1st, 2nd, 3rd, 4.2th...)</input> </div> <div id="document_info"> <label for="cabinet">系统(例如RPC1-2, ESF-B)</label> <input type="text" name="cabinet"> <label for="rev">CIN版本</label> <select id="rev_selection" name="rev"> <option value="a">A</option> <option value="b">B</option> <option value="c">C</option> </select> <label for="pages">总页数</label> <input type="text" name="pages"> <div id="signature"> <label for="draft">设计人</label> <input type="text" name="draft"> <label for="check">互查人</label> <input type="text" name="check"> <label for="review">审核人</label> <input type="text" name="review" id="review_by"> <label for="approve">批准人</label> <input type="text" name="approve" id="approve_by"> </div> <div id="signature_e"> <label for="draft_e">draft</label> <input type="text" name="draft_e"> <label for="check_e">check</label> <input type="text" name="check_e"> <label for="review_e">review</label> <input type="text" name="review_e" id="review_by_e"> <label for="approve_e">approve</label> <input type="text" name="approve_e" id="approve_by_e"> </div> </div>'; 

var document_content = {};
document_content["ied"] = iedHTML;
document_content["cin"] = cinHTML;
// document_content["sw_cd"] = swcdHTML;

// Dynamiclly changed accroding to 
// personal assignment
var reviewAndApprove = {
  'cpr1000': {
    'ied': {
      'check': ['', '', 'Bai Wei'],
      'review': ['张学财', 'Zhang Xuecai', 'MELCO'],
      'approve': ['刘静波', 'Liu Jingbo', 'MELCO']
    },
    'cin': {
      'review': ['赵远洋', 'Zhao Yuanyang'],
      'approve': ['刘静波', 'Liu Jingbo']
    }
  },
  'tw56': {},
  'yj56': {},
  'hyh56': {},
  'fcg34': {}
};

function selectionControl () {
  $("#document_selection").change(function() {
    var val = $(this).val();
    if (val !== "ied") {
      $("#sub_document_selection").html("<option value=''>--default--</option>") 
    }
    else if ( val == 'ied' ) {
      $("#sub_document_selection").html(iedOptions);
    }
  });
}

function contentControl () {
  $("#document_selection").change(function() {

    var selection = $("#document_selection").val();
    if ( selection == "prompt" ) {
      $("#document_content").html("");
    } else {
      $("#document_content").html(document_content[selection]);
    }

  });
}

function setReviewAndApprove () {
  $('#project_selection').change(function () {
    _queryRandA();
  });
  $('#document_selection').change(function () {
    _queryRandA();
  });
}

function _queryRandA () {
  var project = $('#project_selection').val();
  var docCategory = $('#document_selection').val();

  if (project == 'cpr1000') {
    $('#check_by_outer').val(reviewAndApprove[project][docCategory].check ? 
                             reviewAndApprove[project][docCategory].check[2] : '');
    $('#review_by').val(reviewAndApprove[project][docCategory].review[0]);
    $('#review_by_e').val(reviewAndApprove[project][docCategory].review[1]);
    $('#review_by_outer').val(reviewAndApprove[project][docCategory].review[2]);
    $('#approve_by').val(reviewAndApprove[project][docCategory].approve[0]);
    $('#approve_by_e').val(reviewAndApprove[project][docCategory].approve[1]);
    $('#approve_by_outer').val(reviewAndApprove[project][docCategory].approve[2]);
  } else {
    $('#check_by_outer').val('');
    $('#review_by').val('');
    $('#review_by_e').val('');
    $('#review_by_outer').val('');
    $('#approve_by').val('');
    $('#approve_by_e').val('');
    $('#approve_by_outer').val('');
  }
}


$(document).ready( selectionControl );
$(document).ready( contentControl );
$(document).ready( setReviewAndApprove );

