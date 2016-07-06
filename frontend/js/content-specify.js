var iedOptions = '<option value="bdsd">FD(BDSD)功能图</option> <option value="io_list">IO List</option> <option value="software">Software软件图</option> <option value="wiring">WD(IF)接线图</option> '; 

var projectOptions = {
  'cpr1000': '<option value="yj-1" class="cpr1000">YJ-1</option> <option value="yj-2" class="cpr1000">YJ-2</option> <option value="yj-3" class="cpr1000">YJ-3</option> <option value="yj-4" class="cpr1000">YJ-4</option> <option value="hyh-3" class="cpr1000">HYH-3</option> <option value="hyh-4" class="cpr1000">HYH-4</option> <option value="fcg-1" class="cpr1000">FCG-1</option> <option value="fcg-2" class="cpr1000">FCG-2</option> <option value="nd-3" class="cpr1000">ND-3</option> <option value="nd-4" class="cpr1000">ND-4</option>',
  'yj56': '<option value="yj-5">YJ-5</option> <option value="yj-6">YJ-6</option> ',
  'hyh56': '<option value="hyh-5">HYH-5</option> <option value="hyh-6">HYH-6</option> ',
  'fcg34': '<option value="fcg-3" class="fcg34">FCG-3</option> <option value="fcg-4" class="fcg34">FCG-4</option> ',
  'tw56': '<option value="tw-56">TW-5</option> <option value="tw-56">TW-6</option> '
};

var iedHTML = '<label for="unit">机组编号</label> <select id="unit_selection" name="unit"> <!-- the options will be inserted by content-specify.js --> </select> <label for="index_19">19位编码</label> <input type="text" name="index_19"> <label for="index_inter">内部编码</label> <input type="text" name="index_short"> <label for="title">文件名称</label> <input type="text" name="title"> <label for="rev">版本</label> <input type="text" name="rev"> <label for="pages">总页数</label> <input type="text" name="pages"> <div id="signatures_e"> <label for="draft_e">Draft</label> <input type="text" name="draft_e"> <label for="check_e">Check</label> <input type="text" name="check_e" id="check_by_outer"> <label for="review_e">Review</label> <input type="text" name="review_e" id="review_by_outer"> <label for="approve_e">Approve</label> <input type="text" name="approve_e" id="approve_by_outer"> </div> <div id="signatures"> <label for="draft">设计人</label> <input type="text" name="draft"> <label for="check">互查人</label> <input type="text" name="check"> <label for="review">审核人</label> <input type="text" name="review" id="review_by"> <label for="approve">批准人</label> <input type="text" name="approve" id="approve_by"> </div>';

var cinHTML = '<label for="unit">机组编号</label> <select id="unit_selection" name="unit"> <!-- options will be inserted by content-specify.js --> </select> <div id="project_info"> <label for="site_stage">改造阶段</label> <select id="document_selection" name="site_stage"> <option value="">现场改造</option> <option value="periodical">大修</option> </select> <label for="number_of_times">改造次数</label> <input type="text" name="number_of_times">(1st, 2nd, 3rd, 4.2th...)</input> </div> <div id="document_info"> <label for="cabinet">系统(例如RPC1-2, ESF-B)</label> <input type="text" name="cabinet"> <label for="rev">CIN版本</label> <select id="rev_selection" name="rev"> <option value="a">A</option> <option value="b">B</option> <option value="c">C</option> </select> <label for="pages">总页数</label> <input type="text" name="pages"> <div id="signature"> <label for="draft">设计人</label> <input type="text" name="draft"> <label for="check">互查人</label> <input type="text" name="check"> <label for="review">审核人</label> <input type="text" name="review" id="review_by"> <label for="approve">批准人</label> <input type="text" name="approve" id="approve_by"> </div> <div id="signature_e"> <label for="draft_e">draft</label> <input type="text" name="draft_e"> <label for="check_e">check</label> <input type="text" name="check_e"> <label for="review_e">review</label> <input type="text" name="review_e" id="review_by_e"> <label for="approve_e">approve</label> <input type="text" name="approve_e" id="approve_by_e"> </div> </div>'; 

var swcdHTML = '<div id="sw_basic_group"> <h4>基本信息</h4> <label for="unit">项目编号</label> <select id="unit_selection" name="unit"> <option value="yj-1">YJ-1</option> <option value="yj-2">YJ-2</option> <option value="yj-3">YJ-3</option> <option value="yj-4">YJ-4</option> <option value="hyh-3">HYH-3</option> <option value="hyh-4">HYH-4</option> <option value="nd-3">ND-3</option> <option value="nd-4">ND-4</option> <option value="fcg-1">FCG-1</option> <option value="fcg-2">FCG-2</option> </select> <label for="cabinet">系统(例如RPC1-2, ESF-B)</label> <input type="text" name="cabinet"> </div> <div id="sw_rev_group"> <h4>软件信息</h4> <label for="title">Backup名称</label> <input type="text" name="title"> <br> <label for="sw_rev">保管库版本</label> V000.<input type="text" name="sw_rev">(后两位数字) <br> <label for="pol_rev">POL版本</label> V <input type="text" name="pol_rev">(0.02, 1.08 ...) <br> <label for="gca_rev">GCA版本</label> V <input type="text" name="gca_rev">(0.01, 1.00 ...) </div> <div id="sw_add_group"> <h4>随盘文档</h4> <label for="backup_path">Backup路径</label> <input type="text" name="backup_path"> <br> <label for="den_list">DEN清单(多个DEN逗号隔开,可不填)</label> <input type="text" name="den_list"> <br> <label for="new_old_pages">新旧对照页数</label> <input type="text" name="new_old_pages"> </div> <div id="signature"> <h4>签字人</h4> <label for="draft">设计人</label> <input type="text" name="draft"> <label for="check">互查人</label> <input type="text" name="check"> <label for="review">审核人</label> <input type="text" name="review" id="review_by"> </div>';

var document_content = {};
document_content["ied"] = iedHTML;
document_content["cin"] = cinHTML;
document_content["swcd"] = swcdHTML;

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
    },
    'swcd': {
      'review': ['褚瑞', 'Chu Rui'],
      'approve': ['', '']
    }
  },
  'tw56': {},
  'yj56': {},
  'hyh56': {},
  'fcg34': {},
  'prompt': {}
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

    // var project = $("#project_selection").val();
    // console.log('document_selection chagne ' + project);
    // // $("#unit_selection").html(projectOptions[project]);
    // $("#unit_selection").html('hello world');
  });

  $("#project_selection").change(function() {
    var project = $(this).val();
    console.log('project_selection chagne ' + project);
    $("#unit_selection").html(projectOptions[project]);
  });
}

function contentControl () {
  $("#document_selection").change(function() {

    var selection = $("#document_selection").val();
    if ( selection == "prompt" ) {
      $("#document_content").html("<p>请先选择项目及文件类型</p>");
    } else {
      $("#document_content").html(document_content[selection]);
    }

  });
}

function setReviewAndApprove () {
  $('#project_selection').change(function () {
    var project = $('#project_selection').val();
    var docCategory = $('#document_selection').val();
    _queryRandA(project, docCategory);
  });
  $('#document_selection').change(function () {
    var project = $('#project_selection').val();
    var docCategory = $('#document_selection').val();
    _queryRandA(project, docCategory);
  });
}

function _queryRandA (project, docCategory) {

  if (reviewAndApprove[project][docCategory]) {

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

