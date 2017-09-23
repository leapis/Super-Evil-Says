$(document).ready(function(){

  $.post( "php/solrcheck.php", {rows: 1, rowStart:0, postType:"normal",normalData:"mod,help,OP,size",searchBy:"all"}, function( data ) {
    //$( "#text-container" ).html( data );
  });

});
