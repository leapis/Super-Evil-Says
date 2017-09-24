var currentRow = 0; //function to detect which "solr" row we're on
$(document).ready(function(){
  init();
});
function init(){ //performs initial load setup
  //generateQuery() builds query using rows,rowStart,postType,normalData,searchBy
  var query = generateQuery(20,currentRow,'normal','mod,help,OP,size','all');
  currentRow += 20; //TODO: set up actual row variable and have it increase by that
  downloadUrl("php/solrcheck.php", query, function(data) { //POST request to php interfacing with solr
    //these arrays house all the data we gain, might want to rework scope later depending on how powerful our JS will be vs php
    var user = new Array();
    var title = new Array();
    var desc = new Array();
    var id = new Array();
    var date = new Array();
    var link = new Array();
    var type = new Array();

    //start parsing the data we recieved into variables
    var xml = data.responseXML;
    var posts = xml.documentElement.getElementsByTagName("post"); //get all posts
    for (var i = 0; i < posts.length; i++) { //assigned each attribute of post[i] to each array[i]
        user[i] = posts[i].getAttribute("user");
        title[i] = posts[i].getAttribute("title");
        desc[i]= posts[i].getAttribute("description");
        id[i]= posts[i].getAttribute("postID");
        date[i]= posts[i].getAttribute("date");
        link[i]= posts[i].getAttribute("url");
        type[i]= posts[i].getAttribute("type");
    }
    displayResults(user,title,desc,id,date,link,type); //sends data over to DOM-creation function
  });
}


function displayResults(user,title,desc,id,date,link,type){ //creates DOM for new data
  var htmlAppendString = ""; //build DOM in here
  if (currentRow == 20){ //if this is the first bit of data, erase temp/safety html already in place
    $("#text-container").html(""); //erases temp/safety data
  }
  for (var i = 0; i < user.length; i++){ //creates DOM from data. tabbing is as the html would be
    htmlAppendString += '<div class = "devpost-container" data-id="' + id[i] + '">';
      htmlAppendString += '<div class = "devpost-header">';
        htmlAppendString += '<div class = "devpost-header-left">'+ user[i] + " said in response to a " + type[i] + " post: </div>"; //TODO: conditionals for threads
        htmlAppendString += '<div class = "devpost-header-right">' + date[i] + '<br>GO TO SOURCE &gt; </div>';
      htmlAppendString += '</div>';
      htmlAppendString += '<div class = "devpost-title">' + title[i] + '</div>';
      htmlAppendString += '<div class = "devpost-text-container">' + desc[i] + '</div>';
      htmlAppendString += '</div>';
  }
  $("#text-container").append(htmlAppendString); //add our whole Atring htmlAppendString to current display


}

//TODO: comment the rest
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
