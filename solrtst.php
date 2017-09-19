<?php



?>
<!DOCTYPE html>
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script>
  $.post( "php/solrcheck.php", {description:"mod", rows:20}, function( data ) {
  $( ".result" ).html( data );
});
  </script>
</head>
<body>
  <div class="result" />  
</body>
</html>
