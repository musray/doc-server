module.exports = function( sep ) {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth() + 1).toString();
   var dd = this.getDate().toString();

   return yyyy + ( sep? sep: '')
        + (mm[1]? mm: ('0' + mm)) + ( sep? sep: '') 
        + (dd[1]? dd: ('0' + dd));
};
