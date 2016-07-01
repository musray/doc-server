var iedHTML = '<option value="bdsd">FD(BDSD)功能图</option> <option value="io_list">IO List</option> <option value="software">Software软件图</option> <option value="wiring">WD(IF)接线图</option> <option value="layout">Layout布局图</option>' 
// var iedHTML = "<option value='bdsd'>BDSD</option> <option value='io_list'>IO List</option> <option value='wiring'>WD(IF)</option> <option value='software'>软件图</option>"

function selectionControl () {
  $("#document-selection").change(function() {
    var val = $(this).val();
    if (val !== "ied") {
      $("#sub-document-selection").html("<option value=''>--default--</option>") 
    }
    else if ( val == 'ied' ) {
      $("#sub-document-selection").html(iedHTML);
    }
  });
}

$(document).ready( selectionControl );
