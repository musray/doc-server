var iedOptions = '<option value="bdsd">FD(BDSD)功能图</option> <option value="io_list">IO List</option> <option value="software">Software软件图</option> <option value="wiring">WD(IF)接线图</option> <option value="layout">Layout布局图</option>'; 

var cinHTML = ' <label for="project">项目</label> \
                <select id="document-selection" name="project">\
                  <option value="yj-1">YJ-1</option> \
                  <option value="yj-2">YJ-2</option> \
                  <option value="yj-3">YJ-3</option> \
                  <option value="yj-4">YJ-4</option> \
                  <option value="hyh-3">HYH-3</option> \
                  <option value="hyh-4">HYH-4</option> \
                  <option value="nd-3">ND-3</option> \
                  <option value="nd-4">ND-4</option> \
                  <option value="fcg-1">FCG-1</option> \
                  <option value="fcg-2">FCG-2</option> \
                </select>\
                <label for="site_stage">改造阶段</label>\
                <select id="document-selection" name="site_stage">\
                  <option value="">现场改造</option> \
                  <option value="periodical">大修</option> \
                </select>\
                <label for="number_of_times">改造次数(仅数字,例如3, 4.1等)</label>\
                <input type="text" name="number_of_times"> \
                <label for="cabinet">系统(例如RPC1-2, ESF-B)</label>\
                <input type="text" name="cabinet"> \
                <label for="rev">CIN版本</label>\
                <select id="rev-selection" name="rev">\
                  <option value="a">A</option> \
                  <option value="b">B</option> \
                  <option value="c">C</option> \
                </select>\
                <label for="draft">设计人</label>\
                <input type="text" name="draft">\
                <label for="check">互查人</label>\
                <input type="text" name="check">\
                <label for="review">审核人</label>\
                <input type="text" name="review">\
                <label for="approve">批准人</label>\
                <input type="text" name="approve">\
                <label for="pages">总页数</label>\
                <input type="text" name="pages">';


var iedHTML = '<label for="index_19">19位编码</label> <input type="text" name="index_19"> <label for="index_inter">内部编码</label> <input type="text" name="index_short"> <label for="title">文件名称</label> <input type="text" name="title"> <label for="rev">版本</label> <input type="text" name="rev"> <label for="draft">设计人</label> <input type="text" name="draft"> <label for="check">互查人</label> <input type="text" name="check"> <label for="review">审核人</label> <input type="text" name="review"> <label for="approve">批准人</label> <input type="text" name="approve"> <label for="pages">总页数</label> <input type="text" name="pages">';


var document_content = {};
document_content["ied"] = iedHTML;
document_content["cin"] = cinHTML;
// document_content["sw_cd"] = swcdHTML;

function selectionControl () {
  $("#document-selection").change(function() {
    var val = $(this).val();
    if (val !== "ied") {
      $("#sub-document-selection").html("<option value=''>--default--</option>") 
    }
    else if ( val == 'ied' ) {
      $("#sub-document-selection").html(iedOptions);
    }
  });
}

function contentControl () {
  $("#document-selection").change(function() {

    var selection = $("#document-selection").val();
    if ( selection == "prompt" ) {
      $("#document_content").html("");
    } else {
      $("#document_content").html(document_content[selection]);
    }

  });
}

$(document).ready( selectionControl );
$(document).ready( contentControl );

