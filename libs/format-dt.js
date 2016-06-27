module.exports.formatedDate = function( sep ) {
  var yyyy = this.getFullYear().toString();
  var mm = ( this.getMonth() + 1 ).toString();
  var dd = this.getDate().toString();
  return yyyy + ( sep ? sep : ''  )
      + ( mm[1] ? mm : ('0' + mm)) + ( sep ? sep : '')   
      + ( dd[1] ? dd : ('0' + dd));
}

module.exports.formatedTime = function( sep ) {
  var hour = this.getHours().toString();
  var min = this.getMinutes().toString();
  var sec = this.getSeconds().toString();
  return hour + ( sep ? sep : ''  )
      + ( min[1] ? min : ('0' + min)) + ( sep ? sep : '')   
      + ( sec[1] ? sec : ('0' + sec));
}
