var currentRow = 0;
$(document).ready(function(){
  init();
});
function init(){
  var query = generateQuery(20,currentRow,'normal','mod,help,OP,size','all'); //rows,rowStart,postType,normalData,searchBy
  console.log(query);
  currentRow += 20;
  downloadUrl("php/solrcheck.php", query, function(data) {
      var user = new Array();
      var title = new Array();
      var desc = new Array();
      var id = new Array();
      var date = new Array();
      var link = new Array();
      var type = new Array();

      var xml = data.responseXML;
      var posts = xml.documentElement.getElementsByTagName("post");
      for (var i = 0; i < posts.length; i++) {
          user[i] = posts[i].getAttribute("user");
          title[i] = posts[i].getAttribute("title");
          desc[i]= posts[i].getAttribute("description");
          id[i]= posts[i].getAttribute("postID");
          date[i]= posts[i].getAttribute("date");
          link[i]= posts[i].getAttribute("url");
          type[i]= posts[i].getAttribute("type");
      }
      displayResults(user,title,desc,id,date,link,type);
  });
}


function displayResults(user,title,desc,id,date,link,type){
  var htmlAppendString = "";
  if (currentRow == 20){
    $("#text-container").html("");
  }
  for (var i = 0; i < user.length; i++){
    console.log("creating " + id[i]);
    htmlAppendString += '<div class = "devpost-container" data-id="' + id[i] + '">';
      htmlAppendString += '<div class = "devpost-header">';
        htmlAppendString += '<div class = "devpost-header-left">'+ user[i] + " said in response to a " + type[i] + " post: </div>"; //TODO: conditionals for threads
        htmlAppendString += '<div class = "devpost-header-right">' + date[i] + '<br>GO TO SOURCE &gt; </div>';
      htmlAppendString += '</div>';
      htmlAppendString += '<div class = "devpost-title">' + title[i] + '</div>';
      htmlAppendString += '<div class = "devpost-text-container">' + desc[i] + '</div>';
      htmlAppendString += '</div>';
  }
  $("#text-container").append(htmlAppendString);


}

function downloadUrl(url, dataSent, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };
    //request.overrideMimeType('application/xml');
    request.open('POST', url, true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(dataSent);
}

function doNothing(){
//does nothing
}

function generateQuery(rows,rowStart,postType,normalData,searchBy){
  var generated = 'rows=' + rows + '&rowStart='+rowStart+'&postType='+postType+'&normalData=' + normalData + '&searchBy=' + searchBy;
  return generated; //example result: rows=20&rowStart=0&postType=normal&normalData=mod,help,OP,size&searchBy=all
}
