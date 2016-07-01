var iedHTML = "<option value='bdsd'>BDSD</option> <option value='io_list'>IO List</option> <option value='wiring'>WD(IF)</option> <option value='software'>软件图</option>"

function selectionControl () {
  $("#document-selection").change(function() {
    var val = $(this).val();
    if (val !== "ied") {
      $("#sub-document-selection").html("<option value='no_value'>--default--</option>") 
    }
    else if ( val == 'ied' ) {
      $("#sub-document-selection").html(iedHTML);
    }
  });
}

$(document).ready( selectionControl );
